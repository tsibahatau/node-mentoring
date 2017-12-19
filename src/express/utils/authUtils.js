import jwt from "jsonwebtoken";

export function generateToken(user, secret) {
  let payload = { user: { email: user.email, username: user.username } };
  return jwt.sign(payload, secret);
}
