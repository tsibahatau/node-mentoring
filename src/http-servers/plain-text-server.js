import http from "http";

export default function createPlainTextServer() {
  http
    .createServer(function(req, res) {
      res.setHeader("Content-Type", "text/plain");
      res.end("Hello world!");
    })
    .listen(8081);
}
