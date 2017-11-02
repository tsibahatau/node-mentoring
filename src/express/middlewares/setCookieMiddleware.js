export default function(req, res, next) {
  res.cookie("cookie1", "cookieValue1");
  res.cookie("cookie2", "cookieValue2");
  next();
}
