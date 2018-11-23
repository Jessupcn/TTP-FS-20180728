const router = require('express').Router();
const axios = require('axios');
const { StockAsset } = require('../database/models');
module.exports = router;

router.post('/', (req, res, next) => {
  StockAsset.findOne({
    where: { userId: req.body.userId, tickerSymbol: req.body.tickerSymbol }
  })
    .then(asset => {
      asset
        ? StockAsset.update(
            { quantity: asset.quantity + req.body.quantity },
            {
              where: {
                userId: req.body.userId,
                tickerSymbol: req.body.tickerSymbol
              }
            }
          )
        : StockAsset.create(asset);
    })
    .then(asset => {
      res.status(201).json(asset);
    })
    .catch(next);
});

router.get('/:userId', (req, res, next) => {
  StockAsset.findAll({
    where: {
      userId: req.params.userId
    }
  })
    .then(stockAssets => stockAssets.map(transaction => transaction.dataValues))
    .then(assets => assets.map(asset => {}))
    .then(assets => res.status(200).json(assets))
    .catch(next);
});
