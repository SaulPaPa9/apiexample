const mongoDriver = require('../DataBase/MongooseDriver');
const SalesSchema = require('../DataBase/Schemas/SalesSchema');

class Sales{    
    
}

module.exports = mongoDriver.GetClassModel(SalesSchema, Sales);

