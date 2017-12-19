import express from "express";
import ProductsDAO from "../dao/productsDAO";
import UsersDAO from "../dao/usersDAO";
import jwt from "jsonwebtoken";
import checkToken from "../middlewares/authMiddleware";
import users from "../datastubs/users";
import passport from "../strategies/localStrategy";

const router = express.Router();

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
});

router.post("/api/products", checkToken, function(req, res) {
  const product = {};
  product.name = req.body.name || "Noname";
  product.brand = req.body.brand || "Nobrand";
  product.price = req.body.price || 0;
  product.reviews = req.body.reviews || {};
  ProductsDAO.createProduct(product).then(() =>
    res.send(JSON.stringify(product))
  );
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

router.get("/api/users", checkToken, checkToken, function(req, res) {
  UsersDAO.getAllUsers().then(users => res.send(JSON.stringify(users)));
});

export default router;
