// middleware/is-logged-in.js
export function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/auth/log-in");
  }
  next();
}
