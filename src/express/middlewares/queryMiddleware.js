export default function(req, res, next) {
  res.write(`parsedQuery: ${JSON.stringify(req.query)}`);
  res.end();
}
