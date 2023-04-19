import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Buyer username required"]
    },
    products: [{
        productId: {
            type: Number,
            required: [true, "Product ID is required"]
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"]
        }
    }]
}, { collection: 'shoppingcart' });

export default schema;