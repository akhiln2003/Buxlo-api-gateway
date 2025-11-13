import { Application, Request, Response } from "express";
import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";
import { ClientRequest } from "http"; // ✅ add this import

export const setUpProxy = (app: Application, routes: any[]) => {
  routes.forEach((route) => {
    const proxyConfig = {
      target: route.proxy.target,
      changeOrigin: route.proxy.changeOrigin,
      pathRewrite: route.proxy.pathRewrite,
      on: {
        proxyReq: (
          proxyReq: ClientRequest,
          req: Request & { currentUser?: any },
          res: Response
        ) => {
          if (req.currentUser) {
            proxyReq.setHeader("X-User-Data", JSON.stringify(req.currentUser));
          }
        },
      },
    };

    console.log(
      `[Gateway] Proxy setup for ${route.url} → ${route.proxy.target}`
    );
    const proxyMiddleware = createProxyMiddleware(proxyConfig);
    app.use(route.url, proxyMiddleware);
  });
};
