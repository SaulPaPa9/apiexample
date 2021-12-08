const Purchases = require('../Models/Purchases');
const Service = require('../Services/PurchasesService');

class PurchasesController {
  static async GetAll(req, res, next) {
    let purchases = await Purchases.find();
    res.status(200).json(purchases);
  }

  static async Create(req, res, next) {
    let body = req.body;
    let errorMessage;

    if (body && Object.keys(body).length > 0 && body.quantity) {
      try {
       
        let responseObject = await Service.Create(req.body);

          res.status(200).json({
            data: responseObject,
            message: "Purchase stored successfully"
          });
       
      } catch (err) {
        res.status(500).json({
          message: err.message
        });
      }
    }
    else
      errorMessage = "Missing request data";

    if (errorMessage)
      res.status(400).json({ message: errorMessage });
  }

}

module.exports = PurchasesController;