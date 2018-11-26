const router = require('express').Router();
const axios = require('axios');
const { StockAsset } = require('../database/models');
module.exports = router;

// Post a new stockAsset or update an existing one
router.post('/', (req, res, next) => {
  StockAsset.findOne({
    where: { userId: req.body.userId, tickerSymbol: req.body.tickerSymbol }
  })
    .then(asset => {
      asset
        ? StockAsset.update(
            { quantity: +asset.quantity + +req.body.quantity },
            {
              where: {
                userId: req.body.userId,
                tickerSymbol: req.body.tickerSymbol
              }
            }
          )
        : StockAsset.create(req.body);
    })
    .then(asset => {
      res.status(201).json(asset);
    })
    .catch(next);
});

// Find all of a user's stockAssets
router.get('/:userId', (req, res, next) => {
  StockAsset.findAll({
    where: {
      userId: req.params.userId
    }
  })
    .then(stockAssets => stockAssets.map(transaction => transaction.dataValues))
    .then(assets => {
      const stockInfoPromises = assets.map(asset => {
        return axios.get(
          `https://api.iextrading.com/1.0/stock/${asset.tickerSymbol}/quote`
        );
      });
      let stockIndex = 0;
      return Promise.all(stockInfoPromises)
        .then(stockArray => stockArray.map(stock => stock.data))
        .then(stockInfo => {
          assets.forEach(asset => {
            asset.currentPrice = stockInfo[stockIndex].latestPrice;
            asset.openPrice = stockInfo[stockIndex].open.toFixed(2);
            stockIndex++;
          });
          return assets;
        });
    })
    .then(assets => res.status(200).json(assets))
    .catch(next);
});
