const router = require('express').Router();
const { User } = require('../database/models');
module.exports = router;

// Update a user's balance
router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      const newBalance =
        req.body.userBalance - req.body.price * req.body.quantity;
      return user.update({ balance: newBalance });
    })
    .then(user => user.dataValues)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(next);
});
