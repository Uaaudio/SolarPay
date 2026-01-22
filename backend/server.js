const express = require("express")
const app = express();
const PORT = 3001


// Importando Conexão com o Database.
const Connection = require("./config/connection")

 Connection.authenticate()
    .then(()=>{
        console.log("Banco Conectado com sucesso! ")
    }).catch((error)=>{
        console.log("Error ao conectar o banco"+ error)
    })


// Meus Models.
const User = require("./database/models/user")
const House = require("./database/models/house")




app.get("/",(req,res)=>{
    res.send("Aplicação Roadando")
})



app.listen(PORT,()=>{
        console.log("Aplicação rodando")
})