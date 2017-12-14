import http from "http";
import fs from "fs";
import path from "path";
import replaceStream from "replacestream";

export default function createHtmlServer() {
  http
    .createServer(function(req, res) {
      const contentStream = fs.createReadStream(
        path.resolve(__dirname, "index.html")
      );
      res.setHeader("Content-Type", "text/html");
      contentStream.pipe(replaceStream("{message}", "test")).pipe(res);
    })
    .listen(8082);
}
