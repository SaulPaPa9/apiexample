const Products = require('../Models/Products');


class ProductsController {
  static async GetAll(req, res, next) {
    let products = await Products.find()
    .populate("Purchases", "idPurchase quantity date");
    res.status(200).json(products);
  }

  static async Create(req, res, next) {
    let body = req.body
    if (body && Object.keys(body).length > 0) {
      try {
        let createdObject = await new Products(body).save();

        res.status(200).json({
          data: createdObject,
          message: "Store a Product succesfully"
        });
      } catch (err) {
        res.status(500).json({
          data: body,
          message: err.message
        });
      }
    }
    else
      res.status(400).send("Missing data to create product");
  }
}

module.exports = ProductsController;