import { NextFunction, Request, Response } from "express";
import { DescriptionService } from "../services/DescriptionService";

class DescriptionController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    const response = await DescriptionService.findAll();
    res.status(200).json(response);
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const response = await DescriptionService.create(name);
    res.status(200).json(response);
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name } = req.body;
    const response = await DescriptionService.update(id as any, name);
    res.status(200).json({ response });
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const response = await DescriptionService.delete(Number(id));
    res.status(200).json({ response });
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const response = await DescriptionService.findById(Number(id));
    res.status(200).json({ response });
  }
}

export { DescriptionController };
