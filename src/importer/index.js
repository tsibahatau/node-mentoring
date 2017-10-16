import fs from "fs";
import util from "util";
import csvjson from "csvjson";

export default class Importer {
  async import(path) {
    const readFile = util.promisify(fs.readFile);
    try {
      return await readFile(path, "utf8");
    } catch (err) {
      console.error("error " + err);
    }
  }

  importSync(path) {
    return csvjson.toObject(fs.readFileSync(path, "utf8"));
  }
}
