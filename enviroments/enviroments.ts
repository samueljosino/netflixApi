const path = require("path");

require("dotenv").config({
  path: path.resolve("enviroments", ".env"),
});

export const JWT_CONFIG = {
  jwtSecret: process.env.JWT_SECRET,
  jwtSecretExpiresIn: Number(process.env.JWT_SECRET_EXPIRESIN) || 3600,
};
