const Sequelize = require("sequelize")
const connection = require("../../config/connection");
const { toDefaultValue } = require("sequelize/lib/utils");


const House = connection.define("houses",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    number:{
        type: Sequelize.INTEGER(3),
        allowNull: false
    },
    createdAt:{
        type: Sequelize.DATE,
        DefaultValue: Sequelize.NOW
    },
     updatedAt:{
        type: Sequelize.DATE,
        DefaultValue: Sequelize.NOW
    }
})



module.exports = House;