import express from 'express';
import SellerController from "./controllers/sellers-controller.js"
import BuyerController from "./controllers/buyers-controller.js"
import ProductController from "./controllers/products-controller.js";
import ShoppingCartController from "./controllers/shopping-cart-controller.js";
import OrdersController from "./controllers/orders-controller.js";
import ChartController from "./controllers/aggregation-controller.js";
import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';

const PORT = 4000

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

ProductController(app)
SellerController(app)
BuyerController(app)
ShoppingCartController(app)
OrdersController(app)
ChartController(app)


try {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB!')
} catch (error) {
    console.log(error);
}

app.listen(PORT, () => { console.log(`Server is listening on port ${PORT}...`) })

