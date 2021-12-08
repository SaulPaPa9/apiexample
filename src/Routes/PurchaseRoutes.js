const express = require('express');
const purchasesController = require("../Controllers/PurchasesController");
const router = express.Router();

router.post("/register-purchases", purchasesController.Create);


module.exports = router;