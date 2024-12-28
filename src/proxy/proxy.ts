import { Application } from "express";
import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";

export const setUpProxy = (app: Application, routes: any[]) => {
  routes.forEach((rout) => {
    const proxyMiddleware: RequestHandler = createProxyMiddleware({
      target: rout.proxy.target,
      changeOrigin: rout.proxy.changeOrigin,
      on: {
        //here instaed of passing user data in headers change future to jwt pass and
        // handle decode logic to common package
        proxyReq: (proxyReq, req: any, res) => {
          if (req.currentUser) {
            proxyReq.setHeader("X-User-Data", JSON.stringify(req.currentUser));
          }
        },
      },
    });
    app.use(rout.url, proxyMiddleware);
  });
};
