module.exports = (sequelize, Sequelize) => {

  const RegisterUser = sequelize.define('registerUsers', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  return RegisterUser;
}
