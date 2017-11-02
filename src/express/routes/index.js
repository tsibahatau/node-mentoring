import express from "express";

const router = express.Router();

const products = {
  1: {
    name: "Supreme T-Shirt",
    brand: "Supreme",
    price: 99.99,
    options: [{ color: "blue" }, { size: "XL" }],
    reviews: [
      { author: "test", headline: "nooo", text: "noooooooo", grade: 4 },
      { author: "test2", headline: "nooo1", text: "noooooooo2", grade: 3 }
    ]
  },
  2: {
    name: "T-Shit",
    brand: "nope",
    price: 9,
    options: [{ color: "red" }, { size: "L" }]
  }
};

let productsCounter = 2;

const users = [{ username: "123" }, { username: "1234" }];

router.get("/api/products", function(req, res) {
  res.send(JSON.stringify(products));
});

router.get("/api/products/:id", function(req, res) {
  res.send(JSON.stringify(products[req.params.id]));
});

router.get("/api/products/:id/reviews", function(req, res) {
  res.send(JSON.stringify(products[req.params.id]["reviews"]));
});

router.post("/api/products", function(req, res) {
  let product = {};
  product.name = req.body.name;
  product.brand = req.body.brand;
  product.price = req.body.price;
  products[++productsCounter] = product;
  res.send(JSON.stringify(product));
});

router.get("/api/users", function(req, res) {
  res.send(JSON.stringify(users));
});

export default router;
