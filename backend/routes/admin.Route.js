const express = require("express");
const router = express.Router();
const {CreateUser,CreateHouse} = require("../controllers/adminController");

router.use("/createuser",CreateUser);
router.use("/createhouse",CreateHouse)


module.exports = router;







