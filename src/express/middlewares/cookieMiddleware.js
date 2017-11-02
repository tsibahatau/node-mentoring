export default function(req, res, next) {
  res.write(`parsedCookies: ${req.headers.cookie}\n`);
  next();
}
