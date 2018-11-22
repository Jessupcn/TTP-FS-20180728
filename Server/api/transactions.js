const router = require('express').Router();
const { Transaction } = require('../database/models');
module.exports = router;

router.post('/', (req, res, next) => {
  Transaction.create(req.body)
    .then(transaction => res.status(201).json(transaction))
    .catch(next);
});

router.get('/:userId', (req, res, next) => {
  console.log('I RAN!!!!');
  Transaction.findAll()
    .then(transactions => {
      console.log(transactions);
      return transactions.data;
    })
    .then(transactions => res.status(200).json(transactions))
    .catch(next);
});
