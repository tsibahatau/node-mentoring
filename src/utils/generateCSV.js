import fs from "fs";
import { join } from "path";
import { Readable } from "stream";

const headerstub = `id,name,brand,company,price,isbn`;

function printHelpMessage() {
  console.log(`
  Please provide path to directory  and number of lines per file with lines/L .
  Default values are 100 000 for L and ./ for path`);
}

function writeCSV(path = "./", lines = 100000) {
  console.time("writeCSV");
  const fileName = join(path, `test.csv`);
  const output = fs.createWriteStream(fileName);
  let counter = 1;
  const inStream = new Readable({
    read(size) {
      counter <= lines
        ? this.push(
            `${counter++},Bumetanide,Bumetanide,Mylan Institutional Inc.,$42.28,158995707-5\n`
          )
        : this.push(null);
    }
  });
  inStream.push(headerstub + "\n");
  inStream.pipe(output);
  output.once("finish", () => console.timeEnd("writeCSV"));
}

const args = require("minimist")(process.argv.slice(2), {
  alias: {
    help: "h",
    files: "f",
    path: "p",
    lines: "l"
  }
});

if (args.help) {
  printHelpMessage();
} else {
  writeCSV(args.path, args.lines && parseInt(args.lines));
}
