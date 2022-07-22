import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_CONFIG } from "../../enviroments/enviroments";
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    throw new Error("error");
  }
  const token = bearerToken.split(" ")[1];
  const isTokenvalid = await verify(token, JWT_CONFIG.jwtSecret);
  if (!isTokenvalid) {
    throw new Error("error");
  }
  next();
}
