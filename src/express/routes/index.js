import express from "express";
import ProductsDAO from "../dao/productsDAO";
import UsersDAO from "../dao/usersDAO";
const router = express.Router();

const products = [
  {
    id: 0,
    name: "Supreme T-Shirt",
    brand: "Supreme",
    price: 99.99,
    options: [{ color: "blue" }, { size: "XL" }],
    reviews: [
      { author: "test", headline: "nooo", text: "noooooooo", grade: 4 },
      { author: "test2", headline: "nooo1", text: "noooooooo2", grade: 3 }
    ]
  },
  {
    id: 1,
    name: "T-Shit",
    brand: "nope",
    price: 9,
    options: [{ color: "red" }, { size: "L" }]
  }
];

const users = [{ username: "123" }, { username: "1234" }];

const productsDAO = new ProductsDAO(products);
const usersDAO = new UsersDAO(users);

router.get("/api/products", function(req, res) {
  const products = productsDAO.getAllProducts();
  res.send(JSON.stringify(products));
});

router.get("/api/products/:id", function(req, res) {
  const product = productsDAO.getProduct(req.params.id);
  if (!product) {
    res.status(404).send("No such product");
  } else {
    res.send(JSON.stringify(product));
  }
});

router.get("/api/products/:id/reviews", function(req, res) {
  const product = productsDAO.getProduct(req.params.id);
  if (!product) {
    res.status(404).send("No such product");
  } else {
    res.send(JSON.stringify(productsDAO.getReviews(product.id)));
  }
});

router.post("/api/products", function(req, res) {
  const product = {};
  product.name = req.body.name || "Noname";
  product.brand = req.body.brand || "Nobrand";
  product.price = req.body.price || 0;
  product.reviews = req.body.reviews || {};
  res.send(JSON.stringify(productsDAO.createProduct(product)));
});

router.get("/api/users", function(req, res) {
  res.send(JSON.stringify(usersDAO.getAllUsers()));
});

export default router;
