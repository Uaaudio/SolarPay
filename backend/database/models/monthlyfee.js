const Sequelize = require("sequelize")
const connection = require("../../config/connection")

const MonthylFee = connection.define("monthlyfee",{

    id:{
        type:Sequelize.INTEGER ,
        primaryKey: true,
        autoIncrement: true
    },
    month :{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    year:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    payed:{
        type:Sequelize.BOOLEAN,
        defaultValue: false
    },
     createdAt:{
        type: Sequelize.DATE,
        DefaultValue: Sequelize.NOW
    },
    updatedAt:{
        type: Sequelize.DATE,
        DefaultValue: Sequelize.NOW
    }

});





module.exports = MonthylFee 