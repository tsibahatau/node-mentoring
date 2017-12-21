import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import Config from "../config/config";

const env = "development";
const config = Config[env];

const sequelize = new Sequelize(config);
const db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(function(file) {
    const model = require(path.join(__dirname, file)).default;
    db[model.name] = model.init(sequelize);
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
