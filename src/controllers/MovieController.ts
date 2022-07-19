import { NextFunction, Request, response, Response } from "express";
import { MovieService } from "../services/MovieService";

class MovieController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    const response = await MovieService.findAll();
    res.status(200).json(response);
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const { name, descriptionText, movieCategoryId } = req.body;
    const response = await MovieService.create(
      name,
      descriptionText,
      movieCategoryId
    );
    res.status(200).json(response);
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name } = req.body;
    const response = await MovieService.update(id as any, name);
    res.status(200).json({ response });
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const response = await MovieService.delete(Number(id));
    res.status(200).json({ response });
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const response = await MovieService.findById(Number(id));
    res.status(200).json({ response });
  }
}

export { MovieController };
