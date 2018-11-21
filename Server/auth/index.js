const router = require('express').Router();
const { User, Transaction } = require('../database/models');
module.exports = router;

router.post('/login', (req, res, next) => {
  User.findOne({
    where: { email: req.body.email },
    include: [{ model: Transaction }]
  })
    .then(user => {
      return user.dataValues;
    })
    .then(user => {
      if (!user) {
        res.status(401).send('Wrong username and/or password');
      } else if (req.body.password !== user.password) {
        res.status(401).send('Wrong email and/or password');
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)));
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  req.body.balance = 500000;
  User.create(req.body)
    .then(user => {
      console.log('USERRRR: ', user);
      req.login(user, err => (err ? next(err) : res.json(user)));
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists');
      } else {
        next(err);
      }
    });
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/isLoggedIn', (req, res) => {
  res.json(req.user);
});
