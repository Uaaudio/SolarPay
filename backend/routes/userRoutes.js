const express = require("express");
const router = express.Router();
const {UserHome,SeeMyHouses,HouseDetails} = require("../controllers/userController")


router.get("/:id",UserHome);
router.get("/seehouses/:id",SeeMyHouses)
router.get("/housedetails/:id/:hid",HouseDetails)

module.exports = router