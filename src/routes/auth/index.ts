import { Router } from "express";
import { AuthController } from "../../controllers/AuthController";

const authRouter = Router();

authRouter.post("/login", AuthController.login);

// authRouter.post("/refreshToken", AuthController.refreshToken);

export { authRouter };
