const mongoDriver = require('../DataBase/MongooseDriver');
const ProductsSchema = require('../DataBase/Schemas/ProductsSchemas');

class Products {
    get RemainingToBuy() {

        if (!this.remainingToBuy) {

            let purchasesQuantity = 0;
            if (this.Purchases)
                this.Purchases.forEach(item => {
                    purchasesQuantity += item.quantity;
                });

            this.remainingToBuy = (purchasesQuantity <= 30) ? 30 - purchasesQuantity : 0;
        }

        return this.remainingToBuy;
    }
}

module.exports = mongoDriver.GetClassModel(ProductsSchema, Products);