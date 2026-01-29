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

  if(userName != "" && userEmail!= undefined){


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

  }else{
    alert("Confira os campos")
  }


  }

async function CreateHouse(req,res){

    const adminId = req.params.id

    const number = req.body.houseNumber
    const resident = req.body.houseWonner

  if(resident != null && resident != ""){

    try{
  
        await House.create({
            number,
            userId: resident
        })
  
        return res.redirect("/admin/seedashboard/"+adminId);
    }catch{
        console.send("Erro ao criar a casa");
        return res.redirect("/admin/seedashboard/"+adminId);
    }    

  }

}

async function DeleteHouse(req,res) {


  const userId = req.params.id

  const houseId = req.body.houseNumber;
  const OwnerId = req.body.houseWonner;

  const HouseToDelete = await House.findOne({where:{id:houseId}});



  if (houseNumber == HouseToDelete.id ){

    await House.destroy({where:{id:houseId}});
    
    return res.redirect("/admin/seedashboard/"+userId);
   
  }
  else{
    
    return res.redirect("/admin/seedashboard/"+userId);

  }
};

async function EditHouse(req,res){

  const houseId = req.body.houseId;

  const houseNumber = req.body.houseNumber;
  const HouseWonner = req.body.houseWonner;

  if (houseNumber != null){
    try{

        await House.update({
      number:houseNumber,
      userId: HouseWonner
    },{

      where:{
        id:houseId
      }
    }

    );

    return res.redirect("/admin/seedashboard/1");
    }catch{
      console.log("Erro ao atualizar casa.")

      return res.redirect("/admin/seedashboard/1");
    }

  }else{
    console.log("Campo Number vazio")
    return res.redirect("/admin/seedashboard/1");
  }

  

  

};



async function DeleteUser(req,res) {
  
  const UserId = req.params.id

  if(UserId != undefined  || UserId != NaN ){

    await User.destroy({
      where:{id:UserId}
    })
    res.send("Sucesso ao apagar Usuário!")
  }else{
    res.send("Id inválido")
  };

}

async function EditUser(req,res){

  const id = req.params.id // pega id do user pelo params

  let userName = req.body.userName
  let userEmail = req.body.userEmail
  let userPassword = req.body.userPassword

  const userData = User.findOne({where:{id:id}})

  if (userName == "" || userName == undefined){
    userName = userData.userName
  }
  if (userEmail == "" || userEmail == undefined){
    userEmail = userData.userEmail
  }
  if (userPassword == "" || userPassword == undefined){
    userPassword = userData.userPassword
  }
  
  try{

    await User.update({
  
      userName: userName,
      userEmail:userEmail,
      userPassword: userPassword
  
    },
    {
      where: {id:id}
    })

    return res.send("Usuario Atualizado")

  }catch{
    return res.send("User não atualizado")
  }


  


  
}

async function SeeDashboard(req,res){

  const userloged = req.params.id
  const houseCounter = await House.count();
  const userCounter = await User.count();
  const pendingFees= await MonthylFee.findAll({where:{payed:false}});
  const payedFees= await MonthylFee.findAll({where:{payed:true}});

  User.findAll()
    .then((users)=>{
      
      return res.render("dashboard",{userloged,users,userCounter,houseCounter,payedFees,pendingFees});

  });
  
};


module.exports = {CreateUser,CreateHouse,DeleteUser,EditUser,SeeDashboard,DeleteHouse,EditHouse};