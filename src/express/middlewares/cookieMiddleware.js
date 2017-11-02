export default function(req, res, next) {
  if (req.headers.cookie) {
    res.parsedCookies = parse(req.headers.cookie);
  }
  next();
}

function parse(cookieString) {
  let pairs = cookieString.split(/; */);
  let cookies = {};
  pairs.forEach(pair => {
    let equalSign = pair.indexOf("=");
    if (equalSign) {
      cookies[pair.substr(0, equalSign)] = pair.substr(
        equalSign + 1,
        pair.length
      );
    }
  });
  return cookies;
}
