const mongoDriver = require('../DataBase/MongooseDriver');
const SaleDetailsSchema = require('../DataBase/Schemas/SaleDetailsSchema');

class SaleDetails{
    
    
}

module.exports = mongoDriver.GetClassModel(SaleDetailsSchema, SaleDetails);

