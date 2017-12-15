import { URL } from "url";

export default function(req, res, next) {
  res.parsedQuery = req.query;
  next();
}
