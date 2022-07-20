const path = require("path");

require("dotenv").config({
  path: path.resolve("enviroments", ".env"),
});
console.log(process.env.TYPEORM_TYPE);
const typeORMConnectionOptions = {
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ["src/entities/*.{js,ts}"],
  synchronize: true,
  migrations: [`src/database/migrations/*/.ts`],
  seeds: [`src/database/seeds/*/{.ts,.js}`],
  subscribers: [`/subscriber/*/.[jt]s`],

  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/database/migrations",
    subscribersDir: "src/subscriber",
  },
};

module.exports = typeORMConnectionOptions;
