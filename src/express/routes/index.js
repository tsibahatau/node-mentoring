import express from "express";
import ProductsDAO from "../dao/productsDAO";
import UsersDAO from "../dao/usersDAO";
import jwt from "jsonwebtoken";
import checkToken from "../middlewares/authMiddleware";
import users from "../datastubs/users";
import passport from "../strategies/localStrategy";

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

const productsDAO = new ProductsDAO(products);
const usersDAO = new UsersDAO(users);

router.get("/api/products", checkToken, function(req, res) {
  const products = productsDAO.getAllProducts();
  res.send(JSON.stringify(products));
});

router.get("/api/products/:id", checkToken, function(req, res) {
  const product = productsDAO.getProduct(req.params.id);
  if (!product) {
    res.status(404).send("No such product");
  } else {
    res.send(JSON.stringify(product));
  }
});

router.get("/api/products/:id/reviews", checkToken, function(req, res) {
  const product = productsDAO.getProduct(req.params.id);
  if (!product) {
    res.status(404).send("No such product");
  } else {
    res.send(JSON.stringify(productsDAO.getReviews(product.id)));
  }
});

router.post("/api/products", checkToken, function(req, res) {
  const product = {};
  product.name = req.body.name || "Noname";
  product.brand = req.body.brand || "Nobrand";
  product.price = req.body.price || 0;
  product.reviews = req.body.reviews || {};
  res.send(JSON.stringify(productsDAO.createProduct(product)));
});

router.post("/auth", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.status(404).send({ message: "Not Found" });
    } else {
      let payload = { user: { email: user.email, username: user.username } };
      let token = jwt.sign(payload, "secret");
      return res.send(token);
    }
  })(req, res, next);
});

router.get("/api/users", checkToken, function(req, res) {
  res.send(JSON.stringify(usersDAO.getAllUsers()));
});

export default router;
