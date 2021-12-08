const express = require('express');
const salesController = require("../Controllers/SalesController");
const router = express.Router();

router.post("/register-sales", salesController.Create);


module.exports = router;