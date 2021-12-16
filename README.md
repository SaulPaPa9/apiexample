# apiexample
This repository contains an example of the structure used on an api backend project

## Challenge

You have been hired as a backend developer for a major company
marketer of cleaning products, this company places purchase orders for the
products required in your operation and sales orders of the products sold your
customers. Both purchase orders and sales orders are being filled
manually by the accounting area and they want to make a system that facilitates this management.
The following system must register purchase orders with the information:
● id, date, quantity, productid, productname
The following system should register sales orders with the information:
● id, date, quantity, productid, productname
As a project manager on the backend side, you must design a microservice in
NodeJs with the following rest API:
● POST -> / register-purchase - allows to register a product purchase and add stock to the
Inventory
● POST -> / register-sale - allows to register a product sale and decrease stock of the
Inventory

### Considerations:
● There is no product in stock when the operation starts
● The purchase limit in the month for a product must not exceed the quantity of 30
units.
● A sell order cannot be placed if there is no stock available
● CLUE -> The purchase order date indicates when there is availability in the
inventory for a certain product.
● CLUE -> FIFO (first in, first out)

## Deliverables
● Source code in repository on Github
● Project documentation that you consider important
## Bonus
● Use a database for data storage
● Unit tests
● Use docker containers
● Use a linting tool (Eslint)
● Type of architecture implemented in the exercise

## Technology

This app uses the following key technologies:

- [Express](https://expressjs.com/)
- [Mongoose.js](https://mongoosejs.com/)
- [Jest](https://jestjs.io/)
- [Docker] (https://docs.docker.com/)


## Setup

Install packages.
```shell script
npm install
```

Install Mongo Compass (optional) https://www.mongodb.com/try/download/compass

Install and run Docker (example whit version for windows) https://docs.docker.com/desktop/windows/install/


## Usage

Run the linter.
```shell script
npm run lint
```

Build the app Docker image.
```shell script
docker-compose build
```

Up mongoDB and app Docker containers.
```shell script
docker-compose up
```

Acces to running app container and Run the tests.
```shell script
docker exec -it cleanapp_postsapi_1 bash
npm run test-coverage
```
