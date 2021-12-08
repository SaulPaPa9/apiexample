const mongoose = require('mongoose');

const SaleDetailsSchema = {
    //collectionName (table Name), required dfinition
    collectionName: "saledetails",
    //schema structure of collection (table columns and its properties), required definition
    schema: {
        quantity: { type: Number,  required : true },      
        purchase: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'purchases'
        }
    }
}

module.exports = SaleDetailsSchema;