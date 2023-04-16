import productModel from './product-model.js';
export const findProducts = () => productModel.find();
export const findProductById = (pid) => productModel.find({ product_id: pid });
export const createProduct = (product) => productModel.create(product);
export const deleteProduct = (pid) => productModel.deleteOne({ product_id: pid });
export const updateProduct = (pid, product) => productModel.updateOne({ product_id: pid }, { $set: product })

