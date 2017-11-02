import url from "url";

export default function(req, res, next) {
  res.parsedQuery = parse(req.url);
  next();
}

function parse(urlString) {
  return url.parse(urlString, true).query;
}
