import orderModel from './orders-model.js';

export const createOrder = (order) => orderModel.create(order);
export const findOrdersByBuyerUsername = (buyer_username) => orderModel.find({ buyer_username: buyer_username });
export const findOrderById = (pid) => orderModel.findOne({ order_id: pid });
export const findOrderBySeller = async (seller_username) => {
    const orders = await orderModel.find();
    return orders.filter((order) => {
        const shipments = order.shipments || [];
        return shipments.some((shipment) => shipment.seller_username === seller_username);
    });
}

export const findOrderAndSpecificShipmentBySeller = (seller_username) => orderModel.find({
                                                                          'shipments': {
                                                                              $elemMatch: {
                                                                                  'seller_username': seller_username
                                                                              }
                                                                          }
                                                                      }).select({
                                                                                    'shipments.$': 1,
                                                                                    'order_id': 1,
                                                                                    'buyer_username': 1,
                                                                                    'totalPrice': 1,
                                                                                    'paymentMethod': 1,
                                                                                    'shippingAddress': 1,
                                                                                    'orderDate': 1,
                                                                                });

export const updateOrderShipmentStatus = (orderId, shipmentId, status) => {
    const now = Date.now();
    return orderModel.updateOne(
        { order_id: orderId, "shipments.shipmentId": shipmentId },
        {
            $set: {
                "shipments.$[elem].shipmentStatusLog": {
                    status: status,
                    date: now.toLocaleString(),
                },
            },
        },
        {
            arrayFilters: [{ "elem.shipmentId": shipmentId }],
            new: true,
        }
    );
};

export const cancelAllShipments = (orderId) => {
    const date = new Date();
    const shipmentStatusLog = {
        status: "Cancelled",
        date: date.toLocaleDateString(),
    };
    return orderModel.updateOne(
        { order_id: orderId },
        { $set: { "shipments.$[].shipmentStatusLog": shipmentStatusLog } },
        { acknowledge: true }
    );
};