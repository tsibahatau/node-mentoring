import config from "../config/config";
import { User, Product } from "./models";
import DirWatcher from "./dirwatcher";
import Importer from "./importer";
import fs from "fs";
import path from "path";
import csvjson from "csvjson";

console.log(config.name);
const baseDirectory = "c://data";
new User();
new Product();
const dw = new DirWatcher();
const importer = new Importer();
dw.watch(baseDirectory, 1000);
dw.on("dirwatcher:changed", filename => {
  const fullFileName = path.join(baseDirectory, filename);
  fs.exists(fullFileName, exists => {
    if (exists) {
      importer
        .import(fullFileName)
        .then(data => console.log(csvjson.toObject(data)));
    } else {
      console.log("File " + fullFileName + " was removed");
    }
  });
});
