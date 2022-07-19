import { Router } from "express";
import { ProfileController } from "../../controllers/ProfileController";

const profileRouter = Router();

profileRouter.get("/", ProfileController.findAll);

profileRouter.post("/", ProfileController.create);

profileRouter.patch("/:id", ProfileController.update);

profileRouter.delete("/:id", ProfileController.delete);

profileRouter.get("/:id", ProfileController.findById);

export { profileRouter };
