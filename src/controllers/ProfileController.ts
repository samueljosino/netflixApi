import { NextFunction, Request, response, Response } from "express";
import { ProfileService } from "../services/ProfileService";
import { UserService } from "../services/UserService";

class ProfileController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    const response = await ProfileService.findAll();
    res.status(200).json(response);
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const { name, userId } = req.body;
    const response = await ProfileService.create(name, userId);
    res.status(200).json(response);
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name } = req.body;
    const response = await ProfileService.update(id as any, name);
    res.status(200).json({ response });
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const response = await ProfileService.delete(Number(id));
    res.status(200).json({ response });
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const response = await ProfileService.findById(Number(id));
    res.status(200).json({ response });
  }
}

export { ProfileController };
