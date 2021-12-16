const Sales = require('../Models/Sales');
const Purchases = require('../Models/Purchases');
const Products = require('../Models/Products');
const SaleDetails = require('../Models/SaleDetails');

class SalesService {  
  static async Create(data) {
    
    let errorMessage;

      try {
        let product = await Products.findOne({ name: data.productName });
        let purchases = await Purchases.find({ product: product._id, quantityToSale: { $gt: 0 } })        
        .sort("date");        

        // if product does not exist, the sale can't be finalized
        if (purchases && purchases.length > 0) {
          // check if exist required stock to sale
          let quantityStock = 0;
          purchases.every(item => {
            quantityStock += item.quantityToSale;
            if (quantityStock >= data.quantity)
              return false;
            else
              return true;
          });

          // check remaining quantity to buy for this product
          if (quantityStock >= data.quantity) {

            let newSaleObject = {
              idSale: data.id,
              quantity: data.quantity,
              date: data.date
            };
            let sale = await new Sales(newSaleObject).save();

            let quantityToDiscount = sale.quantity, purchaseIndex = 0;

            while(quantityToDiscount > 0 && purchaseIndex < purchases.length){

              let purchase = purchases[purchaseIndex],
              currentDiscount = purchase.quantityToSale;

              if (currentDiscount > quantityToDiscount)
                currentDiscount = quantityToDiscount;

              let saleDetail = await new SaleDetails({ purchase: purchase._id, quantity: currentDiscount }).save();
             
              sale.details.push(saleDetail._id);
              purchase.quantityToSale -= currentDiscount;
              await purchase.save();

              quantityToDiscount -= currentDiscount;
              
              purchaseIndex++;
            }

            await sale.save();

            let responseObject = {
              id: sale.idPurchase,
              date: sale.date,
              quantity: sale.quantity,
              productId: product.idProduct,
              productName: product.name
            };

            return responseObject;

            /*
            res.status(200).json({
              data: responseObject,
              message: "Sale stored successfully"
            });
            */
          }
          else
            errorMessage = `You can only sale ${quantityStock} ${data.productName}`;
        }
        else
          errorMessage = `Product ${data.productName} not found to sale`;

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

module.exports = SalesService;