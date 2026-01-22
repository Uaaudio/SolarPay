const Sequelize = require("sequelize")
const connection = require("../../config/connection")

//improtando model da casa.
const House = require("./house")


const User = connection.define("users",{
    UserName:{
        type: Sequelize.STRING(35),
        allowNull: false
    },
    Password:{
        type: Sequelize.INTEGER(10),
        allowNull: false
    },
    
});

House.belongsTo(User);
User.hasMany(House);


User.sync({force:true}).then(()=>{console.log("Tabela Usar Sincronizada com Sucesso")}).catch(console.error,()=>{console.log("Erro ao sincronizar tabela User")});

module.exports = User;