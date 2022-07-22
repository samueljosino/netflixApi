import { Router } from "express";
import { DescriptionController } from "../../../controllers/DescriptionController";

const descriptionRouter = Router();

descriptionRouter.get("/", DescriptionController.findAll);

descriptionRouter.post("/", DescriptionController.create);

descriptionRouter.patch("/:id", DescriptionController.update);

descriptionRouter.delete("/:id", DescriptionController.delete);

descriptionRouter.get("/:id", DescriptionController.findById);

export { descriptionRouter };
