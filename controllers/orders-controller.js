import * as ordersDao from "../orders/orders-dao.js";

const createOrder = async (req, res) => {
    const newOrder = req.body;
    newOrder.order_id = Date.now();
    newOrder.orderDate = Date.now();
    try {
        const insertedOrder = await ordersDao.createOrder(newOrder);
        res.status(200).json(insertedOrder);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).json({ errors: err.errors });
        } else if (err.code === 11000) {
            res.status(422).json({ error: "Order with the same id already exists!" });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
}

const findOrdersByBuyerUsername = async (req, res) => {
    const { buyer_username } = req.params;
    try {
        const orders = await ordersDao.findOrdersByBuyerUsername(buyer_username);
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const findOrderBySeller = async (req, res) => {
    const { seller_username } = req.params;
    try {
        const orders = await ordersDao.findOrderBySeller(seller_username);
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const findOrderAndSpecificShipmentBySeller = async (req, res) => {
    const { seller_username } = req.params;
    try {
        const orders = await ordersDao.findOrderAndSpecificShipmentBySeller(seller_username);
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateOrderShipmentStatus = async (req, res) => {
    const { orderId, shipmentId } = req.params;
    const { status } = req.body;
    try {
        const result = await ordersDao.updateOrderShipmentStatus(orderId, shipmentId, status);
        res.status(200).json({ message: "Order shipment status updated successfully", result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const cancelAllShipments = async (req, res) => {
    const { orderId } = req.params;
    try {
        const result = await ordersDao.cancelAllShipments(orderId);
        res.status(200).json({ message: "All shipments in the order have been cancelled", result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export default (app) => {
    app.get('/api/orders/buyer/:buyer_username', findOrdersByBuyerUsername);
    app.get('/api/orders/seller/:seller_username', findOrderBySeller);
    app.get('/api/orders/shipmentsBySeller/:seller_username', findOrderAndSpecificShipmentBySeller);
    app.put('/api/orders/updateShipmentStatus/:orderId/shipment/:shipmentId', updateOrderShipmentStatus);
    app.put('/api/orders/cancel/:orderId', cancelAllShipments);
    app.post('/api/orders', createOrder);

}
