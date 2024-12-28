import JWT from "jsonwebtoken";
import { NotAuthorizedError } from "@buxlo/common";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.userAccessToken;
  if (!token) {
    throw new NotAuthorizedError();
  }
  try {
    const secret = process.env.JWT_ACCESS_SECRET as string;

    const decoded = JWT.verify(token, secret) as any;

    req.currentUser = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    throw new NotAuthorizedError();
  }
};
