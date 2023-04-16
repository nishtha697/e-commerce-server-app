import express from 'express';
import SellerController from "./controllers/sellers-controller.js"
import BuyerController from "./controllers/buyers-controller.js"
import ProductController from "./controllers/products-controller.js";
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


try {
    await mongoose.connect('mongodb+srv://GoswamiNGuptaS:Mp0Sp7qX0gyfcmtC@cs5200project.uko8lgd.mongodb.net/e-commerce?retryWrites=true&w=majority')
    console.log('Connected to MongoDB!')
} catch (error) {
    console.log(error);
}

app.listen(PORT, () => { console.log(`Server is listening on port ${PORT}...`) })

