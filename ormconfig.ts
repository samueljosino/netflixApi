const typeORMConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "468146",
  database: "netflixdatabase",
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
