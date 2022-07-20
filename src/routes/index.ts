import { Router } from "express";
import { authRouter } from "./auth";
import { categoryRouter } from "./category";
import { descriptionRouter } from "./description";
import { movieRouter } from "./movies";
import { profileRouter } from "./profile";
import { userRouter } from "./user";

const routes = Router();

routes.use("/movie", movieRouter);

routes.use("/category", categoryRouter);

routes.use("/user", userRouter);

routes.use("/profile", profileRouter);

routes.use("/description", descriptionRouter);

routes.use("/auth", authRouter);

export { routes };
