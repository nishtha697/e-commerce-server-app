import mongoose from 'mongoose';
import sellerSchema from './seller-schema.js'

const sellerModel = mongoose.model('SellerModel', sellerSchema);

export default sellerModel;

