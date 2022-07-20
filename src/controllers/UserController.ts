import { NextFunction, Request, response, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    const response = await UserService.findAll();
    res.status(200).json(response);
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const { name, password } = req.body;
    const response = await UserService.create(name, password);
    res.status(200).json(response);
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name } = req.body;
    const response = await UserService.update(id as any, name);
    res.status(200).json({ response });
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const response = await UserService.delete(Number(id));
    res.status(200).json({ response });
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const response = await UserService.findById(Number(id));
    res.status(200).json({ response });
  }
}

export { UserController };
