import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import loggingMiddleware from "./logger/morgan";
import { setUpProxy } from "./proxy/proxy";
import { ROUTES } from "./routes/routes";
import { setupAuth } from "./auth/auth";
import { errorHandler } from "@buxlo/common";
import { webhookProxy } from "./proxy/webhookProxy";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const allowedOrigins = process.env.FRONT_END_BASE_URL!.split(",");

/**
 * ⚡ STRIPE WEBHOOK (must be before any parsers)
 */
app.post(
  "/api/payment/stripe/webhook",
  express.raw({ type: "application/json" }),
  (req, res, next) => {
    console.log("🚀 Stripe webhook received at Gateway!");
    console.log("Headers:", req.headers);
    console.log("Body buffer:", Buffer.isBuffer(req.body));
    console.log("Body length:", req.body?.length);
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Stripe-Signature:", req.headers["stripe-signature"]);
    next();
  },
  webhookProxy
);



/**
 * ✅ Normal routes after webhook
 */
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(loggingMiddleware);
app.use(cookieParser());

setupAuth(app, ROUTES);
setUpProxy(app, ROUTES);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API-Gateway running at http://localhost:${PORT}`);
});
