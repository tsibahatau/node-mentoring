require("dotenv").config({
  path: require("path").join(__dirname, "../../..", ".env")
});

module.exports = {
  development: {
    host: "localhost",

    database: process.env.POSTGRES_DB,

    username: process.env.POSTGRES_USER,

    password: process.env.POSTGRES_PASSWORD,

    port: "5432",

    dialect: "postgres"
  }
};
