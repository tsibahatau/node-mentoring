const fs = require("fs");
const join = require("path").join;
const Readable = require("stream").Readable;

const inStream = new Readable();
const headerstub = `id,name,brand,company,price,isbn`;
const lineStub = `1,Bumetanide,Bumetanide,Mylan Institutional Inc.,$42.28,158995707-5`;

function printHelpMessage() {
  console.log(`
  Please provide path to directory  and number of lines per file with lines/L . 
  Default values are 100 000 for L and ./ for path`);
}

function writeCSV(path = "./", lines = 100000) {
  const fileName = join(path, `test.csv`);
  const output = fs.createWriteStream(fileName);
  currentLine = 1;
  const inStream = new Readable({
    read(size) {
      if (currentLine <= lines) {
        let bufferString = "";
        while (
          currentLine <= lines &&
          Buffer.byteLength(bufferString, "utf8") <
            size -
              Buffer.byteLength(
                `${currentLine},Bumetanide,Bumetanide,Mylan Institutional Inc.,$42.28,158995707-5\n`,
                "utf8"
              )
        ) {
          bufferString += `${currentLine},Bumetanide,Bumetanide,Mylan Institutional Inc.,$42.28,158995707-5\n`;
          currentLine++;
        }
        this.push(bufferString);
      } else {
        this.push(null);
      }
    }
  });
  inStream.push(headerstub + "\n");
  inStream.pipe(output);
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
