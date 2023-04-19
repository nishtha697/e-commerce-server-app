import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
                                                      address1: { type: String, required: [true, 'Address line 1 is required'] },
                                                      address2: { type: String },
                                                      city: { type: String, required: [true, 'City is required'] },
                                                      state: { type: String, required: [true, 'State is required'] },
                                                      zipcode: { type: String, required: [true, 'Zipcode is required'] },
                                                  });

const shipmentSchema = new mongoose.Schema({
                                               shipmentId: { type: Number, required: [true, 'Shipment ID is required'] },
                                               seller_username: { type: String, required: [true, 'Seller username is required'] },
                                               products: [
                                                   {
                                                       product_id: { type: Number, required: [true, 'Shipment Product ID is required'] },
                                                       quantity: { type: Number, required: [true, 'Shipment Product Quantity is required'] },
                                                       pricePerUnit: { type: Number, required: [true, 'Shipment Price per unit is required'] },
                                                   },
                                               ],
                                               shipmentStatusLog: [
                                                   {
                                                       status: { type: String, required: [true, 'Shipment Status is required'] },
                                                       date: { type: String, required: [true, 'Shipment Status Date is required'] },
                                                   },
                                               ]
                                           });

const orderSchema = new mongoose.Schema({
                                            order_id: { type: Number, required: [true, 'Order ID is required'] },
                                            buyer_username: { type: String, required: [true, 'Buyer username is required'] },
                                            shipments: { type: [shipmentSchema], required: [true, 'Shipments are required'] },
                                            totalPrice: { type: Number, required: [true, 'Total price is required'] },
                                            paymentMethod: { type: String, required: [true, 'Payment method is required'] },
                                            orderDate: { type: Number, required: [true, 'Order date is required'] },
                                            shippingAddress: { type: addressSchema, required: [true, 'Shipping address is required'] },
                                        }, { collection: 'order' });

export default orderSchema;
