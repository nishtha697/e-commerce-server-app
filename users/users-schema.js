import mongoose from 'mongoose';
const schema = mongoose.Schema({
                                   type: String,
                                   username: String,
                                   password: String,
                                   first_name: Array,
                                   email: Number,
                                   default_address: Object,
                                   phone: Number
                               }, {collection: 'user'});
export default schema;