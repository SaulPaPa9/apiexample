require("dotenv").config();

const config =
{
    mainapi:
    {
        port: process.env.API_PORT || 3000,
        cors: process.env.CORS,
    },
    mongodb:
    {
        dbUser: process.env.DB_USER,
        dbPassword: process.env.DB_PASSWORD,
        dbHost: process.env.DB_HOST,
        dbName: process.env.DB_NAME
    }
}

module.exports = config;
