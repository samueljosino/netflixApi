import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";

class CategoryController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    const response = await CategoryService.findAll();
    res.status(200).json(response);
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const response = await CategoryService.create(name);
    res.status(200).json(response);
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name } = req.body;
    const response = await CategoryService.update(id as any, name);
    res.status(200).json({ response });
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const response = await CategoryService.delete(Number(id));
    res.status(200).json({ response });
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const response = await CategoryService.findById(Number(id));
    res.status(200).json({ response });
  }
}

export { CategoryController };
