const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require('crypto');

// Records every user
const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    get() {
      return () => this.getDataValue('password');
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  balance: {
    type: Sequelize.DOUBLE,
    validate: {
      min: 0
    }
  },
  // Keeps track of the salt used on a user's password
  salt: {
    type: Sequelize.STRING,
    // Hides sale when serializing to JSON.
    get() {
      return () => this.getDataValue('salt');
    }
  }
});

module.exports = User;

/**
 * Instance methods
 */

// Returns if the inputed password is correct
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * Class methods
 */

// Generates a random salt for a user's password
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */

// Encrypts password with the user's salt
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
