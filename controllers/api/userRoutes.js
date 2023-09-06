const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
<<<<<<< HEAD
    //finds single user where email = what is passed into body of request
    const userData = await User.findOne({ where: { email: req.body.name } });
=======
    //finds single user where user_name = what is passed into body of request
    const userData = await User.findOne({ where: { user_name: req.body.user_name } });
>>>>>>> 1f40f8991323710798a2359bed774485ff2902a1

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

<<<<<<< HEAD
    //sents const that is true or false if pw data from db = pw in request
=======
    //sets const that is true or false if pw data from db = pw in request
>>>>>>> 1f40f8991323710798a2359bed774485ff2902a1
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    //saves current session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    //deletes the session on logout
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
