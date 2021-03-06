const Sequelize = require('sequelize');
const db = require('../db');

// Records a user's total quantity of each stockAsset
const StockAsset = db.define('stockAsset', {
  tickerSymbol: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
});

module.exports = StockAsset;
