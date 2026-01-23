const Sequelize = require("sequelize");
const connection = require("../../config/connection");

// importando model da casa.
const House = require("./house");

// importando model da taxa mensal.
const MonthylFee = require("./monthlyfee");

const User = connection.define("users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: Sequelize.STRING(35),
    allowNull: false
  },
  userEmail: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  userPassword: {
    type: Sequelize.INTEGER(10),
    allowNull: false
  },

  userHouse:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
  ,
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

// relacionamentos

User.hasMany(House)
House.belongsTo(User)

House.hasMany(MonthylFee);
MonthylFee.belongsTo(House);

module.exports = User;
