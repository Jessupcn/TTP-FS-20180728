const User = require('./user');
const Transaction = require('./transaction');

// Model associations
Transaction.belongsTo(User);
User.hasMany(Transaction);

// export models from index file
module.exports = {
  User,
  Transaction
};
