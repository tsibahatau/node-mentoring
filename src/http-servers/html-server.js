import http from "http";
import fs from "fs";

export default function createHtmlServer() {
  http
    .createServer(function(req, res) {
      let content = fs.readFileSync("./src/http-servers/index.html");
      res.setHeader("Content-Type", "text/html");
      res.write(content.toString().replace("{message}", "test"));
    })
    .listen(8082);
}
