// Models.
const User = require("../database/models/user")
const House = require("../database/models/house")
const MonthlyFee = require("../database/models/monthlyfee");
const { where } = require("sequelize");

async function createUser(req, res) {

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
      return res.redirect("/admin/seedashboard/" + req.body.adminId);
    } catch (error) {
      console.log("Erro ao criar usuario.", error);
      return res.status(500).send("Erro ao criar usuário");
    }

  }else{
    console.log("Confira os campos");
    return res.redirect("/admin/seedashboard/" + req.body.adminId);
  }


  }

async function createHouse(req,res){

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
        console.log("Erro ao criar a casa");
        return res.redirect("/admin/seedashboard/"+adminId);
    }    
  } else {
    return res.redirect("/admin/seedashboard/"+adminId);
  }

}

async function deleteHouse(req,res) {

  const userId = req.params.id

  const houseId = req.body.houseNumber;
  const ownerId = req.body.houseWonner;

  const houseToDelete = await House.findOne({where:{id:houseId}});



  if (houseToDelete && houseId == houseToDelete.id ){

    await House.destroy({where:{id:houseId}});
    
    return res.redirect("/admin/seedashboard/"+userId);
   
  }
  else{
    
    return res.redirect("/admin/seedashboard/"+userId);

  }
};

async function editHouse(req,res){

  const adminId = req.params.id; // ID do admin para redirecionamento
  const houseId = req.body.houseId;

  const houseNumber = req.body.houseNumber;
  const houseOwner = req.body.houseWonner;

  if (houseNumber != null && houseOwner != null){
    try{

      await House.update({ 
      number:houseNumber, // Campos a serem alterados.
      userId: houseOwner // Campos a serem alterados.
    },{

      where:{
        id:houseId // Campo de busca.
      }
    }

    );

    return res.redirect("/admin/seedashboard/" + adminId);
    }catch{
      console.log("Erro ao atualizar casa.")

      return res.redirect("/admin/seedashboard/" + adminId);
    }

  }else{
    console.log("Campo Number vazio")
    return res.redirect("/admin/seedashboard/" + adminId);
  }

};



async function deleteUser(req,res) {
  
  const userId = req.params.id
  const adminId = req.body.adminId;

  if(userId != undefined && !isNaN(userId) ){

    await User.destroy({
      where:{id:userId}
    })
    return res.redirect("/admin/seedashboard/" + adminId);
  }else{
    res.send("Id inválido")
  };

}

async function editUser(req,res){

  const id = req.params.id // pega id do user pelo params
  const adminId = req.body.adminId;

  let userName = req.body.userName
  let userEmail = req.body.userEmail
  let userPassword = req.body.userPassword

  const userData = await User.findOne({where:{id:id}})

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

    return res.redirect("/admin/seedashboard/" + adminId);

  }catch{
    return res.send("User não atualizado")
  }

}

async function seeDashboard(req,res){

  const userLogged = req.params.id
  const houseCounter = await House.count();
  const userCounter = await User.count();
  const pendingFees= await MonthlyFee.findAll({where:{payed:false}});
  const payedFees= await MonthlyFee.findAll({where:{payed:true}});
  const houses = await House.findAll(); // Busca todas as casas para listar

  User.findAll()
    .then((users)=>{
      
      return res.render("dashboard",{userloged: userLogged,users,houses,userCounter,houseCounter,payedFees,pendingFees});

  });
  
};


module.exports = {createUser,createHouse,deleteUser,editUser,seeDashboard,deleteHouse,editHouse};