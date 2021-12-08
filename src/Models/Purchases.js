const mongoDriver = require('../DataBase/MongooseDriver');
const PurchasesSchema = require('../DataBase/Schemas/PurchasesSchema');


class Purchases {

    get RemainingToSale() {
        if (!this.remainingToSale) {
            let salesQuantity = 0;

            if (this.Sales)
                this.Sales.forEach(item => {
                    salesQuantity += item.quantity;
                });

            if (salesQuantity <= this.quantity)
                this.remainingToSale = this.quantity - salesQuantity;
        }

        return this.remainingToSale;
    }
}

module.exports = mongoDriver.GetClassModel(PurchasesSchema, Purchases);

