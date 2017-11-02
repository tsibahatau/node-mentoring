import http from "http";

export default function createEchoServer() {
  http
    .createServer(function(req, res) {
      req.pipe(res);
    })
    .listen(8084);
}
