const withAuth = (req, res, next) => {
  res.locals.showNavbar = req.session.loggedIn;
  res.locals.showSidebar = req.session.loggedIn;

  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else { next(); }
};

module.exports = withAuth;