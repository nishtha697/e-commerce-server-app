import mongoose from 'mongoose';
const schema = mongoose.Schema({
                                   username: { type: String, required: [true, "Buyer username required"] },
                                   password: { type: String, required: [true, "Buyer password required"] },
                                   first_name: { type: String, required: [true, "Buyer first name required"] },
                                   last_name: { type: String, required: [true, "Buyer last name required"] },
                                   email: { type: String, required: [true, "Buyer email required"] },
                                   addresses: { type: Array, required: [true, "Buyer address required"] },
                                   phone: { type: Number, required: [true, "Buyer phone number required"] },
                                   dob: { type: Number, required: [true, "Buyer dob required"] },
                               }, {collection: 'buyer'});
export default schema;