
const app = require('../../app');
const supertest = require('supertest');
const purchasesRoutes = require('../../Routes/PurchaseRoutes');
const Products = require("../../Models/Products");
const Purchases = require('../../Models/Purchases');

app.use(purchasesRoutes);

const testServer = app.listen();

afterAll(() => {
    testServer.close()
});

// Start with tests
//Purchases
describe("test suite", () => {

    //register a new propduct and purcharse    
    let productId;

    beforeEach(async () => {
        let product = await new Products({
            idProduct: "tp1",
            name: "TestProduct"
        }).save();

        productId = product.id;

        await new Purchases({
            idPurchase: "p011",
            product: product._id,
            quantity: 25,
            date: new Date("2021-12-05")
        }).save();

    });

    afterEach(async () => {

        await Purchases.deleteMany({ product: productId });
        await Products.deleteOne({ _id: productId });
    });


    it("Should store a purchase", async () => {
        const response = await supertest(testServer).post("/register-purchases").send({
            "id": "p012",
            "date": "2021-12-05",
            "quantity": "5",
            "idProduct": "tp1",
            "productName": "TestProduct"
        });

        //console.log(response.body);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Purchase stored successfully");
    });

    it("Should refuse store a purchase", async () => {
        const response = await supertest(testServer).post("/register-purchases").send({
            "id": "p012",
            "date": "2021-12-05",
            "quantity": "32",
            "idProduct": "tp1",
            "productName": "TestProduct"
        });

        //console.log(response.body);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe("You can only buy 30 TestProduct for month 12");
    });

    it("Should store a sale", async () => {
        let product = await Products.findOne({name: "TestProduct"});
        
        console.log("SbE i9i", product);
        let purchases = await Purchases.find({ product: product._id, quantityToSale: { $gt: 0 } })        
        .sort("date");

        //console.log("Pur", purchases);

        const response = await supertest(testServer).post("/register-sales").send({
            "id": "s012",
            "date": "2021-12-05",
            "quantity": "20",
            "idProduct": "tp1",
            "productName": "TestProduct"
        });

       // console.log("Body", response.body);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Sale stored successfully");
    });

    it("Should refuse store a sale", async () => {

        
        const response = await supertest(testServer).post("/register-sales").send({
            "id": "s012",
            "date": "2021-12-05",
            "quantity": "10",
            "idProduct": "tp1",
            "productName": "TestProduct"
        });

        //console.log("Body 2", response.body);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe("You can only sale 25 TestProduct tp1");
    });
});