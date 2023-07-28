const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/loginController');
    } else {
        next();
    }
};

module.exports = withAuth;