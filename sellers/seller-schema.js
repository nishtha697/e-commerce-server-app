import mongoose from 'mongoose';

const schema = mongoose.Schema({
    _id: {
        type: Number,
        required: [true, "Seller id required"]
    },
    username: {
        type: String,
        required: [true, "Seller username required"]
    },
    password: {
        type: String,
        required: [true, "Seller password required"],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    name: {
        type: String,
        required: [true, "Seller name required"]
    },
    email: {
        type: String,
        required: [true, "Seller email required"]
    },
    business_address: {
        type: Object,
        required: [true, "Seller address required"]
    },
    phone: {
        type: String,
        required: [true, "Seller phone number required"],
        minlength: [10, 'Minimum phone length is 10 characters'],
        maxlength: [10, 'Maximum phone length is 10 characters']
    },
}, { collection: 'seller', versionKey: false  });

export default schema;