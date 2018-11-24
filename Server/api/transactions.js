const router = require('express').Router();
const { Transaction } = require('../database/models');
module.exports = router;

router.post('/', (req, res, next) => {
  Transaction.create(req.body)
    .then(transaction => {
      res.status(201).json(transaction);
    })
    .catch(next);
});

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
