export default function(req, res, next) {
  console.dir(res.parsedCookies);
  console.dir(res.parsedQuery);
  res.end();
}
