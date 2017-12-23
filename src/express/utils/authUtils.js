import redis from "redis";
import Jwtr from "jwt-redis";

const jwtr = new Jwtr(redis.createClient());

export function generateToken(user, secret) {
  let payload = { user: { email: user.email, username: user.username } };
  return jwtr.sign(payload, secret);
}
