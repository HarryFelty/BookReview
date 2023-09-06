const withAuth = (req, res, next) => {
  //checks login status and directs where needed
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
