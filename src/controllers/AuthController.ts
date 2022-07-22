import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/AuthService";

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    const { name, password } = req.body;
    const response = await AuthService.login(name, password);
    if (response) {
      res.status(200).json(response);
    }
  }
  static async createTokenFromRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { refreshTokenId } = req.body;

    const response = await AuthService.createTokenFromRefreshToken(
      refreshTokenId
    );
    if (response) {
      res.status(200).json(response);
    }
  }
}

export { AuthController };
