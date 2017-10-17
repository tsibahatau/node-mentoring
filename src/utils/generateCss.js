const fs = require("fs");
const util = require("util");
const join = require("path").join;

const stub = `div.download span.icon.type_zip{background:url(../../designs/default/images/icons/zip.gif) no-repeat}`;

function printHelpMessage() {
  console.log(`
  Please provide path to directory, number of files with files/f and number of lines per file with lines/L . 
  Default values are 10 for f and 100 000 for L and ./ for path`);
}

function writeCss(path = "./", files = 2, lines = 100000) {
  const fileNames = Array.from(new Array(files), (val, index) =>
    join(path, `test${index}.css`)
  );
  fileNames.forEach(filename => {
    const output = fs.createWriteStream(filename);
    output.write(stub.repeat(lines));
  });
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
  writeCss(
    args.path,
    args.files && parseInt(args.files),
    args.lines && parseInt(args.lines)
  );
}
