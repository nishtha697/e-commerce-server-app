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

export const findOrderAndSpecificShipmentBySeller = (seller_username) => orderModel
    .find({ 'shipments': { $elemMatch: { 'seller_username': seller_username } } })
    .select({
        'shipments.$': 1,
        'order_id': 1,
        'buyer_username': 1,
        'totalPrice': 1,
        'paymentMethod': 1,
        'shippingAddress': 1,
        'orderDate': 1,
    });

export const updateOrderShipmentStatus = (orderId, shipmentId, status) => {
    return orderModel.findOneAndUpdate(
        { order_id: orderId, "shipments.shipmentId": shipmentId },
        {
            $push: {
                "shipments.$.shipmentStatusLog": {
                    status: status,
                    date: Date.now()
                },
            },
        },
        { new: true }
    );
};

export const cancelAllShipments = (orderId) => {
    const date = new Date();
    const shipmentStatusLog = {
        status: "Cancelled",
        date: Date.now()
    };
    return orderModel.findOneAndUpdate(
        { order_id: orderId },
        { $push: { "shipments.$[].shipmentStatusLog": shipmentStatusLog } },
        { new: true }
    );
};