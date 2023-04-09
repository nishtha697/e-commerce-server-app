import mongoose from 'mongoose';
const schema = mongoose.Schema({
                                   product_id: { type: Number, required: [true, "Product Id required"] },
                                   title: { type: String, required: [true, "Product title required"] },
                                   description: { type: String, required: [true, "Product description required"] },
                                   highlights: { type: String, required: [false] },
                                   category: { type: Array, required: [true, "Product categories required"] },
                                   price: { type: Number, required: [true, "Product price required"] },
                                   seller: { type: String, required: [true, "Seller required"] },
                                   inventory: { type: Number, required: [true, "Product inventory required"] },
                                   product_image: { type: String, required: [true, "Product image required"] },
                               }, {collection: 'product'});
export default schema;