const fs = require("fs");
const request = require("request");
const through2 = require("through2");
const csvToJson = require("csvtojson");
const util = require("util");
const join = require("path").join;

function printHelpMessage() {
  console.log(`
  Please provide an action with --action or -a argument. 
  Possible values are: io, transform, transform-file, bundle-css. 
  Optional args are --file/-f for transform-file, --path for bundle-css `);
}

function transformFile(filePath) {
  const stream = fs
    .createReadStream(filePath)
    .on("error", err => console.error(err.message));

  csvToJson()
    .fromStream(stream)
    .pipe(fs.createWriteStream(filePath.replace(".csv", ".json")));
}

function inputOutput(filePath) {
  fs
    .createReadStream(filePath)
    .on("error", err => console.error(err.message))
    .pipe(process.stdout);
}

async function readDirRecursive(dir, allFiles = []) {
  const readdir = util.promisify(fs.readdir);
  const stat = util.promisify(fs.stat);
  const files = (await readdir(dir)).map(f => join(dir, f));
  allFiles.push(...files);
  await Promise.all(
    files.map(
      async f => (await stat(f)).isDirectory() && readDirRecursive(f, allFiles)
    )
  );
  return allFiles;
}

async function cssBundler(path) {
  const readFile = util.promisify(fs.readFile);
  const fileNames = (await readDirRecursive(path)).filter(
    f => f.endsWith(".css") && !f.endsWith("bundle.css")
  );
  const output = fs.createWriteStream(join(path, "bundle.css"), { flags: "a" });
  output.on("error", e => console.log(e));
  const writeRecursively = filename => {
    const readStream = fs.createReadStream(filename);
    readStream.pipe(output, { end: false });
    readStream.on("end", () => {
      if (fileNames.length > 0) {
        setImmediate(() => writeRecursively(fileNames.shift()));
      } else {
        request(
          "https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css"
        ).pipe(output);
      }
    });
  };
  if (fileNames.length > 0) {
    writeRecursively(fileNames.shift());
  }
}

function transform() {
  process.stdin
    .pipe(
      through2((buffer, enc, cb) => cb(null, buffer.toString().toUpperCase()))
    )
    .pipe(process.stdout);
}

if (require.main === module) {
  const cliArgs = require("minimist")(process.argv.slice(2), {
    alias: {
      help: "h",
      action: "a",
      file: "f"
    }
  });
  Converter(cliArgs);
}

function Converter(args) {
  if (process.argv.slice(2).length === 0 || args.help) {
    printHelpMessage();
  } else {
    switch (args.action) {
      case "io": {
        inputOutput(args.file);
        break;
      }
      case "transform": {
        transform();
        break;
      }
      case "transform-file": {
        transformFile(args.file);
        break;
      }
      case "bundle-css": {
        cssBundler(args.path);
        break;
      }
      default: {
        printHelpMessage();
      }
    }
  }
}

module.exports = Converter;
