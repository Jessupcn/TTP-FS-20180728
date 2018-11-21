const User = require('./user');
const Transaction = require('./transaction');
const StockAsset = require('./stockAsset');

// Model associations
Transaction.belongsTo(User);
User.hasMany(Transaction);

StockAsset.belongsTo(User);
User.hasMany(StockAsset);

// export models from index file
module.exports = {
  User,
  Transaction,
  StockAsset
};
