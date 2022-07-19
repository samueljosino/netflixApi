import { Router } from "express";
import { UserController } from "../../controllers/UserController";

const userRouter = Router();

userRouter.get("/", UserController.findAll);

userRouter.post("/", UserController.create);

userRouter.patch("/:id", UserController.update);

userRouter.delete("/:id", UserController.delete);

userRouter.get("/:id", UserController.findById);

export { userRouter };
