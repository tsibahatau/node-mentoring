const fs = require("fs");
const through2 = require("through2");
const csvToJson = require("csvtojson");

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
    .pipe(process.stdout);
}

function inputOutput(filePath) {
  fs
    .createReadStream(filePath)
    .on("error", err => console.error(err.message))
    .pipe(process.stdout);
}

async function cssBundler(path) {
  const readFile = util.promisify(fs.readFile);
  const readDir = util.promisify(fs.readdir);
  const files = await readDir(path);
}

function transform() {
  process.stdin
    .pipe(
      through2((buffer, enc, cb) => cb(null, buffer.toString().toUpperCase()))
    )
    .pipe(process.stdout);
}

const args = require("minimist")(process.argv.slice(2), {
  alias: {
    help: "h",
    action: "a",
    file: "f"
  }
});

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
