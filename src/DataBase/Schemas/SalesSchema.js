const mongoose = require('mongoose');

const SalesSchema = {
    //collectionName (table Name), required dfinition
    collectionName: "sales",
    //schema structure of collection (table columns and its properties), required definition
    schema: {
        idSale: { type: String, unique: true },
        quantity: { type: Number, required: true },
        date: { type: Date, required: true },
        details: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'saledetails'
        }]
    }
}

module.exports = SalesSchema;