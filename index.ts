import express from "express";
import { PrivateRoutes } from "./src/routes/Private";
import { createConnection } from "typeorm";
import "reflect-metadata";
import { clientErrorHandler } from "./src/middlewares/error/Client";
import { PublicRoutes } from "./src/routes/Public";

export class appController {
  static run() {
    const app = express();
    createConnection();
    app.use(express.json());

    app.use("/api", PublicRoutes);
    app.use("/api", PrivateRoutes);

    app.use(clientErrorHandler);

    app.listen(3000, () => {
      console.log("server is running on http://localhost:3000");
    });
  }
}
appController.run();
