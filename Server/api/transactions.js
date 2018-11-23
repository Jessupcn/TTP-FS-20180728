const router = require('express').Router();
const axios = require('axios');
const { Transaction } = require('../database/models');
module.exports = router;

router.post('/', (req, res, next) => {
  axios
    .get(`https://api.iextrading.com/1.0/stock/${req.body.tickerSymbol}/quote`)
    .then(stockInfo => stockInfo.data)
    .then(stockInfo => {
      const priceToCents = stockInfo.latestPrice * 100;
      const body = { ...req.body, price: priceToCents };
      return body;
    })
    .then(body => Transaction.create(body))
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
