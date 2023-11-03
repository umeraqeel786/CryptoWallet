const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', { dialect: 'postgres', host: 'localhost' });
sequelize.sync();
module.exports = sequelize;