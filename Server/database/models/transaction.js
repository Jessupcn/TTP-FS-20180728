const Sequelize = require('sequelize');
const db = require('../db');

// Records every transaction a user makes
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
    type: Sequelize.VIRTUAL,
    get() {
      const quantity = this.getDataValue('quantity');
      const price = this.getDataValue('price');
      return (quantity * price) / 100;
    }
  }
});

module.exports = Transaction;
