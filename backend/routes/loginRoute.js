const express = require("express");
const router = express.Router();

const {DoLogin} = require("../controllers/loginController")

router.get("/",(req,res)=>{
    res.render("loginPage")
})

router.post("/dologin",DoLogin);


module.exports = router