const router = require('express').Router();
const { Transaction, StockAsset, User } = require('../database/models');
const axios = require('axios');
module.exports = router;

// router.post('/', (req, res, next) => {
//   console.log('REQ BODY: ', req.body);
//   axios
//     .get(`https://api.iextrading.com/1.0/stock/${req.body.tickerSymbol}/quote`)
//     .then(stockInfo => stockInfo.data)
//     .then(stockInfo => {
//       // send back error if user's balance is too low
//       if (req.body.userBalance < stockInfo.latestPrice * 100) {
//         res.status(401).send('Balance Too Low');
//       } else {
//         return Transaction.create(req.body);
//       }
//     })
//     .then(transaction => {
//       res.status(201).json(transaction);
//     })
//     .catch(err => console.log(err));
// });
// //return Promise array
// return Promise.all([transactionPromise, assetPromise, userPromise])

//   Transaction.create(req.body)
//     .then(transaction => {
//       res.status(201).json(transaction);
//     })
//     .catch(err => console.log(err));
// });

router.post('/', (req, res, next) => {
  Transaction.create(req.body)
    .then(transaction => {
      res.status(201).json(transaction);
    })
    .catch(err => console.log(err));
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
