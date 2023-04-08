import mongoose from 'mongoose';
import productsSchema from './products-schema.js'

const productModel = mongoose.model('ProductModel', productsSchema);

export default productModel;

