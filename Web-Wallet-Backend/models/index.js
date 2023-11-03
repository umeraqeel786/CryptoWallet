const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};
  
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.registerUser = require("../models/registerUser.model.js")(sequelize, Sequelize);
db.userTransaction = require("./userTransaction.model.js")(sequelize, Sequelize);
db.userAddresses = require("../models/userAddresses.model.js")(sequelize, Sequelize);

db.registerUser.hasMany(db.userAddresses);
db.userAddresses.belongsTo(db.registerUser);

db.registerUser.hasMany(db.userTransaction);
db.userTransaction.belongsTo(db.registerUser);

module.exports = db;