import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import loggingMiddleware from "./logger/morgan";
import { setUpProxy } from "./proxy/proxy";
import { ROUTES } from "./routes/routes";
import { setupAuth } from "./auth/auth";
import { errorHandler } from "@buxlo/common";

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 4000;

app.use(
  cors({
    origin: process.env.FRONT_END_BASE_URL,
    credentials: true,
  })
);
app.use(loggingMiddleware);

// app.use(helmet());
app.use(cookieParser());
// app.disable("x-powered-by");  // Hide Express server information
setupAuth(app, ROUTES);
setUpProxy(app, ROUTES);

app.use( errorHandler )

try {
  app.listen(PORT, () => {
    console.log(`API-Gateway running at http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("Error starting server:", error);
}
