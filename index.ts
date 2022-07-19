import express from "express";
import { routes } from "./src/routes";
import { createConnection } from "typeorm";
import "reflect-metadata";

export class appController {
  static run() {
    const app = express();
    createConnection();
    app.use(express.json());
    app.use(routes);

    app.listen(3000, () => {
      console.log("server is running on http://localhost:3000");
    });
  }
}
appController.run();
