import jwt from "jsonwebtoken";
import Config from "../config/config";
const env = process.env.development || "development";
const config = Config[env];

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
