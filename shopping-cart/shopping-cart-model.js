import mongoose from 'mongoose';
import shoppingCartSchema from './shopping-cart-schema.js'

const shoppingCartModel = mongoose.model('ShoppingCartModel', shoppingCartSchema);

export default shoppingCartModel;

