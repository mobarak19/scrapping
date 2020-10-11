const express = require("express");
const apiController = require("../controller/apiController");
const router = express.Router();

router.post("/scrapping/to-mysql", apiController.scrapping);

module.exports = router;
