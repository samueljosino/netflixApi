import { Router } from "express";
import { authRouter } from "./auth";

const PublicRoutes = Router();

PublicRoutes.use("/auth", authRouter);

export { PublicRoutes };
