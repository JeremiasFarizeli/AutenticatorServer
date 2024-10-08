const { DataTypes } = require('sequelize');
const { userDB } = require('../database/database');

// Definir o modelo User
const User = userDB.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isLongEnough(value) {
        if (value.length < 8) {
          throw new Error('A senha deve ter pelo menos 8 caracteres.');
        }
      }
    }
  }
});


module.exports = User;
