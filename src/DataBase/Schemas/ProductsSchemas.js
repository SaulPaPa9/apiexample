
const ProductsSchema = {
    //collectionName (table Name), required dfinition
    collectionName: "products",
    //schema structure of collection (table columns and its properties), required definition
    schema: {
        idProduct : {type : String, unique : true},
        name: { type: String, unique : true, required : true},
        cost: {type: Number},
        price: {type: Number}
    },
    // Add createdAt and updatedAt properties to document (table), by default true
    addTimeStamps: false,
    // indicates if virtual (calculated) properties will be retrieve in query result, , by default false
    includeVirtuals: true,
    // virtual properties
    virtualProperties: [
        {
            properyName: "Purchases",
            ref: "purchases",
            localField: "_id",
            foreignField: "product"
        }
    ]
}

module.exports = ProductsSchema;