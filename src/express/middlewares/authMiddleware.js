import jwt from "jsonwebtoken";
import authConfig from "../config/authConfig";
const env = "development";
const config = authConfig[env];

export default function checkToken(req, res, next) {
  let token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        res.json({ success: false, message: "Failed to authenticate token." });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ success: false, message: "No token provided." });
  }
}
