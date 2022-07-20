import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/AuthService";

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    const { name, password } = req.body;
    const response = await AuthService.login(name, password);
    if (response) {
      res.status(200).json(response);
    }
    if (!response) {
      res.status(500).json({ message: "senha incorreta" });
    }
  }
}

export { AuthController };
