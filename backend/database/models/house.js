const Sequelize = require("sequelize")
const connection = require("../../config/connection")


const House = connection.define("houses",{
    Number:{
        type: Sequelize.INTEGER(3),
        allowNull: false
    }
})


House.sync({force:true}).then(()=>{console.log("Tabela House Sincronizada com Sucesso")}).catch(console.error,()=>{console.log("Erro ao sincronizar tabela House")});

module.exports = House;