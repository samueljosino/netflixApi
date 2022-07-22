import { Router } from "express";
import { categoryRouter } from "./category";
import { descriptionRouter } from "./description";
import { movieRouter } from "./movies";
import { profileRouter } from "./profile";
import { userRouter } from "./user";

const PrivateRoutes = Router();

PrivateRoutes.use("/movie", movieRouter);

PrivateRoutes.use("/category", categoryRouter);

PrivateRoutes.use("/user", userRouter);

PrivateRoutes.use("/profile", profileRouter);

PrivateRoutes.use("/description", descriptionRouter);

export { PrivateRoutes };
