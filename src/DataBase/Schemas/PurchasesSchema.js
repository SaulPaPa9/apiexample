const mongoose = require('mongoose');

const PurchasesSchema = {
    //collectionName (table Name), required dfinition
    collectionName: "purchases",
    //schema structure of collection (table columns and its properties), required definition
    schema: {
        idPurchase: { type: String, unique : true },
        quantity: { type: Number, required: true },
        date: { type: Date, required: true },
        quantityToSale: { type: Number },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    },// indicates if virtual (calculated) properties will be retrieve in query result, , by default false
    includeVirtuals: false,
    // virtual properties
    virtualProperties: [
        {
            properyName: "Sales",
            ref: "saledetails",
            localField: "_id",
            foreignField: "purchase"
        }
    ]
}

module.exports = PurchasesSchema;