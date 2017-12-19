import express from "express";
import ProductsDAO from "../dao/productsDAO";
import UsersDAO from "../dao/usersDAO";
import jwt from "jsonwebtoken";
import checkToken from "../middlewares/authMiddleware";
import users from "../datastubs/users";
import passport from "../strategies/localStrategy";
import { generateToken } from "../utils/authUtils";
import authConfig from "../config/authConfig";

const env = "development";
const router = express.Router();
const config = authConfig[env];

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

const productsDAO = new ProductsDAO(products);
const usersDAO = new UsersDAO(users);

router.get("/api/products", checkToken, function(req, res) {
  const products = productsDAO.getAllProducts();
  res.json(products);
});

router.get("/api/products/:id", checkToken, function(req, res) {
  const product = productsDAO.getProduct(req.params.id);
  if (!product) {
    res.status(404).send("No such product");
  } else {
    res.json(product);
  }
});

router.get("/api/products/:id/reviews", checkToken, function(req, res) {
  const product = productsDAO.getProduct(req.params.id);
  if (!product) {
    res.status(404).send("No such product");
  } else {
    res.json(productsDAO.getReviews(product.id));
  }
});

router.post("/api/products", checkToken, function(req, res) {
  const product = {};
  product.name = req.body.name || "Noname";
  product.brand = req.body.brand || "Nobrand";
  product.price = req.body.price || 0;
  product.reviews = req.body.reviews || {};
  res.json(productsDAO.createProduct(product));
});

router.post("/authToken", function(req, res) {
  const user = users.find(
    user =>
      user.username === req.body.username && user.password === req.body.password
  );
  if (user) {
    return res.json({ token: generateToken(user, config.secret) });
  } else {
    return res.status(404).send({ message: "Not Found" });
  }
});

router.post(
  "/auth",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.user) {
      res.json({ token: generateToken(req.user, config.secret) });
    } else {
      return res.status(404).send({ message: "Not Found" });
    }
  }
);

router.get("/api/users", checkToken, function(req, res) {
  res.json(usersDAO.getAllUsers());
});

export default router;
