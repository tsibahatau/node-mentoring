import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(__dirname, "../../..", ".env")
});

export default {
  development: {
    host: "localhost",

    database: process.env.POSTGRES_DB,

    username: process.env.POSTGRES_USER,

    password: process.env.POSTGRES_PASSWORD,

    secret: process.env.JWT_SECRET,

    port: "5432",

    dialect: "postgres"
  }
};
