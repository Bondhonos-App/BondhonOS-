module.exports = (req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self';");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  next();
};
