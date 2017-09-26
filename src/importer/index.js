import fs from "fs";
import csvjson from "csvjson";

export default class Importer {
  import(path) {
    return new Promise(function(resolve, reject) {
      fs.readFile(path, "utf8", (err, content) => {
        if (!err) resolve(content);
      });
    });
  }

  importSync(path) {
    return csvjson.toObject(fs.readFileSync(path, "utf8"));
  }
}
