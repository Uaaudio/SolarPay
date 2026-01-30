const express = require("express");
const router = express.Router();

const {doLogin} = require("../controllers/loginController")

router.get("/",(req,res)=>{
    res.render("loginPage")
})

router.post("/dologin",doLogin);


module.exports = router