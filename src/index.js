import config from "../config/config";
import { User, Product } from "./models";
import DirWatcher from "./dirwatcher";
import Importer from "./importer";
import fs from "fs";
import path from "path";
import csvjson from "csvjson";
import { printHelpMessage } from "./utils/streams.js";
import createPlainTextServer from "./http-servers/plain-text-server";
import createHtmlServer from "./http-servers/html-server";
import createJSONServer from "./http-servers/json-server";
import createEchoServer from "./http-servers/echo-server";
import createExpressServer from "./express";
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

//printHelpMessage();
createPlainTextServer();
createHtmlServer();
createJSONServer();
createEchoServer();
createExpressServer();
