const MonthlyFee = require("../database/models/monthlyfee")
const User = require("../database/models/user")
const House = require("../database/models/house")



async function paymentPage(req, res) {
  
  const UserId = req.params.id; // Constante que pega o Id do user atravez do paramentro.
  const fee = req.params.feeid; // Constante que pega o Id da Taxa atravez do Parametro.

  const feeInfo = await MonthlyFee.findOne({where:{id:fee},include:[{model:House}]}) 

  

  return res.render("paymentPage", { fee, UserId,feeInfo });
}


async function confirmPayment(req,res){

  const feeid = req.params.feeid ;
  
  const fee = await MonthlyFee.findOne({where:{id:feeid}});
  
}


module.exports = {paymentPage}; 