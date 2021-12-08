const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../Config/swagger.json');
const purchasesController = require("../Controllers/PurchasesController");
const salesController = require("../Controllers/SalesController");
const productsController = require("../Controllers/ProductsController");
const router = express.Router();

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


router.get("/", (req, res) => res.send("Welcome to CleanApp api"))
.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
//base api routes
/*
.get("/purchases", purchasesController.GetAll)
.get("/sales", salesController.GetAll)
.get("/products", productsController.GetAll)
.post("/products", productsController.Create)
*/
//routes for microservice

.post("/register-purchases", purchasesController.Create)
.post("/register-sales", salesController.Create);


module.exports = router;