// middleware/pass-user-to-view.js
export function passUserToView(req, res, next) {
    res.locals.user = req.session.user;
    next();
  }
  