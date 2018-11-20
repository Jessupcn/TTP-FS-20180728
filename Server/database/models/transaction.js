const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
  tickerSymbol: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  // price in cents
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  // total in dollars
  total: {
    type: Sequelize.DECIMAL,
    get() {
      return (this.getDataValue('quantity') * this.getDataValue('price')) / 100;
    }
  }
});

module.exports = Transaction;
