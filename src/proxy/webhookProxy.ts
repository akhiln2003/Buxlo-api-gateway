import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import http from "http";
import https from "https";

dotenv.config();

const baseTarget = process.env.PAYMENT_SERVICE_URL?.replace(/\/api\/?$/, "") || "";

export const webhookProxy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log("🎯 [Gateway] Webhook proxy middleware invoked!");
  
  try {
    const targetUrl = new URL(`${baseTarget}${req.path}`);
    
    console.log("---------------------------------------------------------");
    console.log("[Gateway] 🔄 Forwarding Stripe webhook");
    console.log("[Gateway] Target:", targetUrl.href);
    console.log("[Gateway] Body is Buffer:", Buffer.isBuffer(req.body));
    console.log("[Gateway] Body length:", req.body?.length);
    console.log("[Gateway] Stripe-Signature:", req.headers['stripe-signature']);
    
    // 🔍 DEBUG: Show first 100 chars of body
    console.log("[Gateway] Body preview:", req.body.toString('utf8').substring(0, 100));
    console.log("---------------------------------------------------------");

    const options = {
      hostname: targetUrl.hostname,
      port: targetUrl.port || 80,
      path: targetUrl.pathname,
      method: 'POST',
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
        'Content-Length': req.body.length,
        'stripe-signature': req.headers['stripe-signature'] as string,
      },
    };

    const proxyRequest = http.request(options, (proxyResponse) => {
      console.log("[Gateway] ✅ Response status:", proxyResponse.statusCode);
      
      let responseData = '';
      
      proxyResponse.on('data', (chunk) => {
        responseData += chunk;
      });
      
      proxyResponse.on('end', () => {
        console.log("[Gateway] Response body:", responseData);
        res.status(proxyResponse.statusCode || 200).send(responseData);
      });
    });

    proxyRequest.on('error', (error) => {
      console.error("[Gateway] ❌ Request error:", error.message);
      res.status(500).json({ 
        error: "Webhook forwarding failed", 
        message: error.message 
      });
    });

    // Write the exact Buffer
    proxyRequest.write(req.body);
    proxyRequest.end();

  } catch (error: any) {
    console.error("[Gateway] ❌ Webhook proxy error:", error.message);
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: "Webhook forwarding failed", 
        message: error.message 
      });
    }
  }
};