const express = require("express");
const router = express.Router();
const {CreateUser,CreateHouse,DeleteUser,EditUser,SeeDashboard,DeleteHouse, EditHouse} = require("../controllers/adminController");

router.use("/createuser",CreateUser);
router.use("/createhouse",CreateHouse);
router.use("/deleteuser/:id",DeleteUser);
router.use("/edituser/:id",EditUser);
router.use("/seedashboard/:id",SeeDashboard);
router.delete("/deletehouse/:id",DeleteHouse);
router.put("/edithouse/:id",EditHouse);


module.exports = router;







