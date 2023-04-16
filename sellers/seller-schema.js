import mongoose from 'mongoose';
const schema = mongoose.Schema({
    username: { type: String, required: [true, "Seller username required"] },
    password: { type: String, required: [true, "Seller password required"] },
    name: { type: String, required: [true, "Seller name required"] },
    email: { type: String, required: [true, "Seller email required"] },
    business_address: { type: String, required: [true, "Seller address required"] },
    phone: { type: Number, required: [true, "Seller phone number required"] },
}, { collection: 'seller' });
export default schema;