const express = require("express");
const router = express.Router();
const ovulationController = require("../controller/user.con");

router.post("/calculate", ovulationController.calculateOvulation);

module.exports = router;