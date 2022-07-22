import { AppError } from "../../@types/AppError";
import { NextFunction, Request, Response } from "express";

export function clientErrorHandler(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    next(err);
  }

  next();
}
