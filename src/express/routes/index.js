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


router.get("/api/products", function(req, res) {
  ProductsDAO.getAllProducts().then(products =>
    res.send(JSON.stringify(products))
  );
});

router.get("/api/products/:id", checkToken, function(req, res) {
  ProductsDAO.getProduct(req.params.id).then(product => {
    if (!product) {
      res.status(404).send("No such product");
    } else {
      res.send(JSON.stringify(product));
    }
  });
});

router.get("/api/products/:id/reviews", checkToken, function(req, res) {
  ProductsDAO.getReviews(req.params.id).then(reviews => {
    if (!reviews || reviews.length === 0) {
      res.status(404).send("No such reviews");
    } else {
      res.send(JSON.stringify(reviews));
    }
  });


router.post("/api/products", checkToken, function(req, res) {
  const product = {};
  product.name = req.body.name || "Noname";
  product.brand = req.body.brand || "Nobrand";
  product.price = req.body.price || 0;
  product.reviews = req.body.reviews || {};

  ProductsDAO.createProduct(product).then(() =>
   res.json(product)
  );

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

router.get("/api/users", checkToken, checkToken, function(req, res) {
  UsersDAO.getAllUsers().then(users =>res.json(users));
});

export default router;
