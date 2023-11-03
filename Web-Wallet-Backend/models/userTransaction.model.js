module.exports = (sequelize, Sequelize) => {

  const UserTransaction = sequelize.define('userTransactions', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }, 
    chainId: Sequelize.INTEGER,
    from: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gasLimit: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gasPrice: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    maxFeePerGas: {
      type: Sequelize.STRING,
      allowNull: false
    },
    maxPriorityFeePerGas: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nonce: {
      type: Sequelize.STRING,
      allowNull: false
    },
    to: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
  })
  return UserTransaction;
}

