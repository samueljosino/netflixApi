import { Router } from "express";
import { CategoryController } from "../../controllers/CategoryController";

const categoryRouter = Router();

categoryRouter.get("/", CategoryController.findAll);

categoryRouter.post("/", CategoryController.create);

categoryRouter.patch("/:id", CategoryController.update);

categoryRouter.delete("/:id", CategoryController.delete);

categoryRouter.get("/:id", CategoryController.findById);

export { categoryRouter };
