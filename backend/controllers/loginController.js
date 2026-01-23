const User = require("../database/models/user");

async function DoLogin(req, res) {
  const login = req.body.userLogin;
  const password = req.body.userPassword;

  // validação básica
  if (!login || !password) {
    console.log("Login ou senha vazios");
    return res.redirect("/");
  }

  try {
    const thisuser = await User.findOne({
      where: { userEmail: login }
    });

    // usuário não encontrado
    if (!thisuser) {
      console.log("Usuário não encontrado");
      return res.redirect("/");
    }

    // valida senha
    if (password === thisuser.userPassword) {
      console.log("Login efetuado com sucesso");
      return res.redirect("/");
    } else {
      console.log("Senha incorreta");
      return res.redirect("/");
    }

  } catch (error) {
    console.log("Erro ao tentar logar:", error);
    return res.redirect("/");
  }
}

module.exports = { DoLogin };
