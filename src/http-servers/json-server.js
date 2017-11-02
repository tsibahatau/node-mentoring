import http from "http";

const product = {
  id: 1,
  name: "Supreme T-Shirt",
  brand: "Supreme",
  price: 99.99,
  options: [{ color: "blue" }, { size: "XL" }]
};

export default function createJSONServer() {
  http
    .createServer(function(req, res) {
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(product));
    })
    .listen(8083);
}
