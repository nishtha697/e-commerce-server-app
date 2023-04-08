import mongoose from 'mongoose';
const schema = mongoose.Schema({
                                   product_id: Number,
                                   title: String,
                                   description: String,
                                   category: Array,
                                   price: Number,
                                   seller: String,
                                   inventory: Number,
                                   product_image: String,
                               }, {collection: 'product'});
export default schema;