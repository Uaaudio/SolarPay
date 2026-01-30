const express = require("express");
const router = express.Router();
const {createUser,createHouse,deleteUser,editUser,seeDashboard,deleteHouse,editHouse} = require("../controllers/adminController");

router.post("/createuser",createUser);
router.post("/createhouse/:id",createHouse); // :id é o adminId
router.post("/deleteuser/:id",deleteUser); // :id é o userId
router.post("/edituser/:id",editUser); // :id é o userId
router.use("/seedashboard/:id",seeDashboard);
router.post("/deletehouse/:id",deleteHouse); // :id é o adminId
router.post("/edithouse/:id",editHouse); // :id é o adminId


module.exports = router;
