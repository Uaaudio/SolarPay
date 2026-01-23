// Models.
const User = require("../database/models/user")
const House = require("../database/models/house")
const MonthylFee = require("../database/models/monthlyfee");
const { where } = require("sequelize");

async function CreateUser(req, res) {

  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  const apNumber = req.body.houseNumber;

  try {
    const user = await User.create({
      userName,
      userEmail,
      userPassword,
      userHouse: apNumber
    });

    console.log("User criado com sucesso!", user.userName);
    return res.redirect("/");
  } catch (error) {
    console.log("Erro ao criar usuario.", error);
    return res.status(500).send("Erro ao criar usuário");
  }
}

async function CreateHouse(req,res){

    const number = req.body.houseNumber
    const resident = req.body.houseWonner
    try{

        await House.create({
            number,
            userId: resident
        })

        User.findOne({where:{id:resident}})
        .then((ownner)=>{
            console.log("Casa registrada no nome de "+ ownner.userName)
        })

    }catch{
        console.log("Erro ao criar a casa")
    }    

}


module.exports = {CreateUser,CreateHouse};