const User = require("../database/models/user");

async function doLogin(req,res){

  const login = req.body.userLogin // Constante para pegar o login do User (através do name)
  const password = req.body.userPassword // Constante para pegar a senha do User (através do name)

  const user = await User.findOne({ // Faz uma busca no banco para encontrar o User correspondente pelo Email.
    where:{userEmail:login}
  })

  if(user!= null){ // Se o usuario não for nulo ele entra.
    
    if(password == user.userPassword){ // Veifica se a senha está correta de fato.
      
      if(user.admin == true){ // Verifica se o usuario é admin
        
        return res.redirect("/admin/seedashboard/"+user.id) // Se for admin ele manda pro dasboard.
      
      }else{

        return res.redirect("/home/"+user.id) // Retorna a pagina inicial da aplicação
                                                // Pegar o Id do User.
      }

    }else{
      
      return res.redirect("/") // retorna para pagina de login.

    }
    
  }else{

    return res.redirect("/") // Retorna para pagina de Login
  }


}

module.exports = { doLogin };
