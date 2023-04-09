import express from 'express';
import SellerController from "./controllers/sellers-controller.js"
import BuyerController from "./controllers/buyers-controller.js"
import ProductController from "./controllers/products-controller.js";
import mongoose from "mongoose";
import cors from 'cors';

mongoose.connect('mongodb+srv://GoswamiNGuptaS:Mp0Sp7qX0gyfcmtC@cs5200project.uko8lgd.mongodb.net/e-commerce?retryWrites=true&w=majority');


const app = express()
app.use(cors())

ProductController(app)
SellerController(app)
BuyerController(app)

app.listen(4000)

