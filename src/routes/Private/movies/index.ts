import { Router } from "express";
import { MovieController } from "../../../controllers/MovieController";

const movieRouter = Router();

movieRouter.get("/", MovieController.findAll);

movieRouter.post("/", MovieController.create);

movieRouter.patch("/:id", MovieController.update);

movieRouter.delete("/:id", MovieController.delete);

movieRouter.get("/:id", MovieController.findById);

export { movieRouter };
