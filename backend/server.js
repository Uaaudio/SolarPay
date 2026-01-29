const express = require("express")
const app = express();
const PORT = 3001

// config body-parser.
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

// configurando Ejs

const path = require("path")
const ejs = require("ejs");
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "../frontend/pages"));
app.use(express.static('../frontend'));


// Importando Conexão com o Database.
const Connection = require("./config/connection")

 Connection.authenticate()
    .then(()=>{
        console.log("Banco Conectado com sucesso! ")
    }).catch((error)=>{
        console.log("Error ao conectar o banco"+ error)
    })


//importando rotas.
const Login = require("./routes/loginRoute")
const Admin = require("./routes/admin.Route")
const User = require("./routes/userRoutes")
const Payment = require("./routes/paymentRoute")

//usando rotas.
app.use("/",Login);
app.use("/login",Login);
app.use("/admin",Admin)
app.use("/home",User)
app.use("/payment", Payment);



app.listen(PORT,()=>{
        console.log("Aplicação rodando")
})