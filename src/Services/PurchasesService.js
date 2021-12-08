const Purchases = require('../Models/Purchases');
const Products = require('../Models/Products');


class PurchasesService {  

  static async Create(data) {
    
    let errorMessage;

      try {
        let purchaseDate = new Date(data.date), initialMonthDay = new Date(purchaseDate.getFullYear(), purchaseDate.getMonth(), 1);
        let product = await Products.findOne({ name: data.productName })
          .populate("Purchases", "quantity", { "date": { $gte: initialMonthDay, $lte: purchaseDate }, "quantityToSale" : {$gt : 0} });

          //console.log("Product", product);
        // if product does not exist then create it
        if (!product) {
          if (data.quantity <= 30) {
            let newProduct = {
              idProduct: data.idProduct,
              quanity: data.quanity,
              name: data.productName,
              date: new Date(data.date),
            };
            product = await new Products(newProduct).save();
          }
          else
            errorMessage = "You only can bought 30 products for each month";
        }


        // check remaining quantity to buy for this produ
        if (product && product.RemainingToBuy >= data.quantity) {

          let newPurchaseObject = {
            idPurchase: data.id,
            product: product._id,
            quantity: data.quantity,
            date: data.date,
            quantityToSale : data.quantity
          };

          let purchase = await new Purchases(newPurchaseObject).save();

          let responseObject = {
            id: purchase.idPurchase,
            date: purchase.date,
            quantity: purchase.quantity,
            idProduct: product.idProduct,
            productName: product.name,
            quantityToSale: purchase.quantityToSale
          };

          return responseObject;

          /*
          res.status(200).json({
            data: responseObject,
            message: "Purchase stored successfully"
          });
          */
        }
        else
          errorMessage = `You can only buy ${product.RemainingToBuy} ${product.name} for month ${new Date(data.date).getMonth() + 1}`;

      } catch (err) {
        /*
        res.status(500).json({
          message: err.message
        });
        */
        throw new Error(err.message);
      }
    

    if (errorMessage)
      //res.status(400).json({ message: errorMessage });
      throw new Error(errorMessage);
  }
}

module.exports = PurchasesService;