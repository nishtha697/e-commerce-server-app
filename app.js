import express from 'express';
import UserController from "./controllers/users-controller.js"
import ProductController from "./controllers/products-controller.js";
import mongoose from "mongoose";
mongoose.connect('mongodb+srv://GoswamiNGuptaS:Mp0Sp7qX0gyfcmtC@cs5200project.uko8lgd.mongodb.net/e-commerce?retryWrites=true&w=majority');


const app = express()
ProductController(app)
UserController(app)

app.listen(4000)

