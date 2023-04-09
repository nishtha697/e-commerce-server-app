import mongoose from 'mongoose';
import buyerSchema from './buyer-schema.js'

const buyerModel = mongoose.model('BuyerModel', buyerSchema);

export default buyerModel;

