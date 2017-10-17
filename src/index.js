import config from "../config/config";
import { User, Product } from "./models";
import DirWatcher from "./dirwatcher";
import Importer from "./importer";
import fs from "fs";
import path from "path";
import csvjson from "csvjson";
import Converter from "./utils/streams.js";

/*
console.log(config.name);
const baseDirectory = "c://data";
new User();
new Product();
const dw = new DirWatcher();
const importer = new Importer();
dw.watch(baseDirectory, 1000);
dw.on("dirwatcher:changed", filename => {
  importer.import(filename).then(data => console.log(csvjson.toObject(data)));
});
*/

Converter({ help: true });
