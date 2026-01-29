const { where } = require("sequelize")
const House = require("../database/models/house")
const User = require("../database/models/user")
const MonthylFee = require("../database/models/monthlyfee")

async function UserHome(req,res){
    const USERID = req.params.id
    const user = await User.findOne({where:{id:USERID}})

    return res.render("homepage",{user})
}
async function SeeMyHouses(req,res) {
    const id = req.params.id

    const user = await User.findOne({where:{id:id}})

    const houses = await House.findAll({where:{userId:id}})
    
    return res.render("userhouselist",{houses,user});
}

async function HouseDetails(req, res) {
  const id = req.params.id;
  const houseid = req.params.hid

  // pega o usuário
  const user = await User.findOne({ where: { id: id } });

  // pega todas as casas do usuário
  const houses = await House.findAll({ where: { userId: id , id:houseid} });

  // cria um array com os ids das casas
  const houseIds = houses.map(h => h.id);

  // pega todas as taxas que pertencem a essas casas
  const fees = await MonthylFee.findAll({
    where: { houseId: houseIds }
  });

  // renderiza a página passando fees e houses
  return res.render("debits", { fees, houses,user });
}



module.exports = {UserHome,SeeMyHouses,HouseDetails};

