import { Application } from "express";
import { authMiddleware } from "../middlewares/auth";

export const setupAuth = (app: Application, routes: any[]) => {
  routes.forEach((route) => {    
    if (route.auth) {
      app.use(route.url, authMiddleware);
    }
  });
};
