const express = require("express");
const router = express.Router();
const {paymentPage} = require("../controllers/paymentController")

router.get("/:id/:feeid", paymentPage);



module.exports = router