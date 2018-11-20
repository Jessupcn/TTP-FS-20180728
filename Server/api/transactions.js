const router = require('express').Router();
const { Transaction } = require('../database/models');
module.exports = router;

router.post('/', (req, res, next) => {
  Transaction.create(req.body)
    .then(transaction => res.status(201).json(transaction))
    .catch(next);
});
