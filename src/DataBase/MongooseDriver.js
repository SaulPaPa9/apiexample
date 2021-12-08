const mongoose = require('mongoose');
const envConfig = require('../Config/Config');

class MongooseDriver {

    static CreateMongooseInstance(dBUser, dBPassword, dBName, dBHost) {
        this.mongoose = mongoose;
        this.mongoose.Promise = global.Promise;
        this.Connect(encodeURIComponent(dBUser), encodeURIComponent(dBPassword), dBName, dBHost);

        return this.mongoose;
    }

    static async Connect(dbUser, dbPass, dbName, dbHost) {

        let mongoDB_Uri = `mongodb://${dbUser}:${dbPass}@${dbHost}/${dbName}?authSource=admin&readPreference=primary`;
        //let mongoDB_Uri = `mongodb://${envConfig.dbUser}:${envConfig.dbPassword}@${envConfig.dbHost}/${envConfig.dbName}`;
        try {
           // console.log("Connecting ", mongoDB_Uri);
            
            await this.mongoose.connect(mongoDB_Uri, {useNewUrlParser: true});

            console.log("DataBase Connected Successfully!");
        }
        catch (err) {
            throw new Error("DB connection error " + err);
        }
    }

    static mongoose;
    static get Mongoose() {
        //if mongoose instances has not been set, then set for first time
        if (!this.mongoose) {
            if (envConfig.mongodb.dbUser && envConfig.mongodb.dbPassword && envConfig.mongodb.dbName && envConfig.mongodb.dbHost)
                this.mongoose = this.CreateMongooseInstance(envConfig.mongodb.dbUser, envConfig.mongodb.dbPassword, envConfig.mongodb.dbName, envConfig.mongodb.dbHost);
            else {
                let errorMessage = `DataBase connection parameters missing:
              Users: ${envConfig.mongodb.dbUser}
              Password: ${envConfig.mongodb.dbassword}
              DBName: ${envConfig.mongodb.dbName}
              Host: ${envConfig.mongodb.dbHost}`;
                throw new Error(errorMessage);
            }
        }
        return this.mongoose;
    };


    static GetClassModel(classSchema, classType) {
        // So `res.json()` and other `JSON.stringify()` functions include virtuals
        // So `console.log()` and other functions that use `toObject()` include virtuals
        let { collectionName, schema, addTimeStamps, includeVirtuals, virtualProperties } = classSchema;


        if (collectionName && schema) {

            if (!includeVirtuals)
                includeVirtuals = false;

            if (!addTimeStamps)
                addTimeStamps = true;

            let schemaOptions = {
                timestamps: addTimeStamps,
                optimisticConcurrency: true,
                toJSON: { virtuals: includeVirtuals },
                toObject: { virtuals: includeVirtuals },
               // _id: !includeVirtuals,
                //id: includeVirtuals
            };

            let modelSchema = new this.Mongoose.Schema(schema, schemaOptions);

            // add virtual properties from schemaClass to modelSchema

            if (virtualProperties) {
                virtualProperties.forEach(item => {
                    modelSchema.virtual(item.properyName, {
                        ref: item.ref,
                        localField: item.localField,
                        foreignField: item.foreignField
                    });
                });

            }

            if (classType)
                modelSchema.loadClass(classType);


            return this.Mongoose.model(collectionName, modelSchema);
        }
    }
}

module.exports = MongooseDriver;