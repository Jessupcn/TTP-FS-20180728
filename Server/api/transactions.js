const router = require('express').Router();
const { Transaction } = require('../database/models');
module.exports = router;

// Post a new transaction to the database
router.post('/', (req, res, next) => {
  Transaction.create(req.body)
    .then(transaction => transaction.dataValues)
    .then(transaction => res.status(201).json(transaction))
    .catch(err => console.log(err));
});

// Find all of a user's transactions
router.get('/:userId', (req, res, next) => {
  Transaction.findAll({
    where: {
      userId: req.params.userId
    }
  })
    .then(transactions =>
      transactions.map(transaction => transaction.dataValues)
    )
    .then(transactions => res.status(200).json(transactions))
    .catch(next);
});
