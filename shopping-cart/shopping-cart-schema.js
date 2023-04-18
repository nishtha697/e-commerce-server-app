import mongoose from 'mongoose';
const schema = mongoose.Schema({
                                   username: { type: String, required: [true, "Buyer username required"] },
                                   products: [{
                                       productId: { type: Number, required: [true, "Product ID is required"],  unique: true },
                                       quantity: { type: Number }
                                   }]
                               }, { collection: 'shoppingcart' });


export default schema;