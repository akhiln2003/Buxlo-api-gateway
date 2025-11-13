import { Application } from "express";
import { authMiddleware } from "../middlewares/auth";

export const setupAuth = (app: Application, routes: any[]) => {
  routes.forEach((route) => {
    if (route.auth) {
      app.use(route.url, (req, res, next) => {
        if (req.path === "/stripe/webhook") {
          return next();
        }
        authMiddleware(req, res, next);
      });
    }
  });
};
