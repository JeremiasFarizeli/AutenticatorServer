const { Sequelize } = require('sequelize');

// Conexão para o banco de dados de usuários (User)
const userDB = new Sequelize({
  dialect: 'sqlite',
  storage: './databases/users.sqlite', // Arquivo SQLite para usuários
  logging: false
});


module.exports = { userDB };



