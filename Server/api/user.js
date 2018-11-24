const router = require('express').Router();
const { User } = require('../database/models');
module.exports = router;

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      return user.update({ balance: req.body.balance });
    })
    .then(user => user.dataValues)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(next);
});
