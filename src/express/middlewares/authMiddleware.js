import redis from "redis";
import Jwtr from "jwt-redis";
import Config from "../config/config";

const jwtr = new Jwtr(redis.createClient());
const config = Config[process.env.development || "development"];

export default function checkToken(req, res, next) {
  let token = req.headers["x-access-token"];
  if (token) {
    jwtr.verify(token, config.secret, function(err, decoded) {
      console.log(err);
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
