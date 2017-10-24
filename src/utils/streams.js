import fs from "fs";
import request from "request";
import through2 from "through2";
import split2 from "split2";
import util from "util";
import { join } from "path";
import { PassThrough } from "stream";

const epamCss =
  "https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css";

export function printHelpMessage() {
  console.log(`
  Please provide an action with --action or -a argument.
  Possible values are: io, transform, transform-file,transform-file-stdout,bundle-css.
  Required args are:  --file/-f for transform-file,io,transform-file-stdout and --path for bundle-css`);
}

export function transformFile(
  filePath,
  output = process.stdout,
  delimeter = ","
) {
  let counter = 0;
  let headers;
  const stream = fs
    .createReadStream(filePath)
    .on("error", err => console.error(err.message))
    .pipe(split2())
    .pipe(
      through2((buffer, enc, cb) => {
        const lineContent = buffer.toString();
        let jsonObject = {};
        let lineJson = "";
        if (!counter) {
          headers = lineContent.split(delimeter);
          lineJson = "[";
        } else {
          const csvFields = lineContent.split(delimeter);
          if (csvFields.length !== headers.length) {
            throw Error("Mailformed csv on line: " + counter);
          }
          for (let i = 0; i < csvFields.length; i++) {
            jsonObject[headers[i]] = csvFields[i];
          }
          lineJson =
            counter > 1
              ? "," + JSON.stringify(jsonObject)
              : JSON.stringify(jsonObject);
        }
        counter++;
        cb(null, lineJson);
      })
    )
    .on("end", () => output.write("]"))
    .pipe(output);
}

export function inputOutput(filePath) {
  fs
    .createReadStream(filePath)
    .on("error", err => console.error(err.message))
    .pipe(process.stdout);
}

export function transform() {
  process.stdin
    .pipe(
      through2((buffer, enc, cb) => cb(null, buffer.toString().toUpperCase()))
    )
    .pipe(process.stdout);
}

export async function cssBundler(path) {
  try {
    const fileNames = (await readDirRecursive(path)).filter(
      f => f.endsWith(".css") && !f.endsWith("bundle.css")
    );
    const output = fs.createWriteStream(join(path, "bundle.css"));
    output.on("error", e => console.error(e));
    let streams = fileNames.map(f => fs.createReadStream(f));
    combineStreams(...streams, request(epamCss)).pipe(output);
  } catch (e) {
    console.error(e);
  }
}

function combineStreams() {
  const streams = [...arguments];
  const output = new PassThrough();
  try {
    for (let stream of streams) {
      stream.pause();
      stream.pipe(output, { end: false });
      stream.on("end", () => {
        if (streams.length) {
          streams.shift().resume();
        }
      });
      stream.on("error", e => console.error(e));
    }
    streams.shift().resume();
  } catch (e) {
    console.error(e);
  }
  return output;
}

async function readDirRecursive(dir, allFiles = []) {
  const readdir = util.promisify(fs.readdir);
  const stat = util.promisify(fs.stat);
  try {
    const files = (await readdir(dir)).map(f => join(dir, f));
    allFiles.push(...files);
    await Promise.all(
      files.map(
        async f =>
          (await stat(f)).isDirectory() && readDirRecursive(f, allFiles)
      )
    );
  } catch (e) {
    console.error(e);
  }

  return allFiles;
}

if (require.main === module) {
  const cliArgs = require("minimist")(process.argv.slice(2), {
    alias: {
      help: "h",
      action: "a",
      file: "f"
    }
  });
  converter(cliArgs);
}

function converter(args) {
  if (process.argv.slice(2).length === 0 || args.help) {
    printHelpMessage();
  } else {
    switch (args.action) {
      case "io": {
        args.file ? inputOutput(args.file) : printHelpMessage();
        break;
      }
      case "transform": {
        transform();
        break;
      }
      case "transform-file": {
        args.file
          ? transformFile(
              args.file,
              fs.createWriteStream(args.file.replace(".csv", ".json"))
            )
          : printHelpMessage();
        break;
      }
      case "transform-file-stdout": {
        args.file ? transformFile(args.file) : printHelpMessage();
        break;
      }
      case "bundle-css": {
        args.path ? cssBundler(args.path) : printHelpMessage();
        break;
      }
      default: {
        printHelpMessage();
      }
    }
  }
}
