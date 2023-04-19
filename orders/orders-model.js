import mongoose from 'mongoose';
import ordersSchema from './orders-schema.js'

const orderModel = mongoose.model('OrderModel', ordersSchema);

export default orderModel;

