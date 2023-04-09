import * as buyersDao from "../buyers/buyer-dao.js";

const findBuyers = async (req, res) => {
    const buyers = await buyersDao.findBuyers()
    res.json(buyers);
}

const findBuyerById = async (req, res) => {
    const buyer = await buyersDao.findBuyerById(req.params.uid)
    res.json(buyer);
}

const createBuyer = async (req, res) => {
    const newBuyer = req.body;
    newBuyer._id = (new Date()).getTime();
    const insertedBuyer = await buyersDao.createBuyer(newBuyer);
    res.json(insertedBuyer);
}

const updateBuyer = async (req, res) => {
    const buyerIdToUpdate = req.params.pid;
    const updates = req.body;
    const status = await buyersDao.updateBuyer(buyerIdToUpdate, updates);
    res.json(status);
}

export default (app) => {
    app.post('/api/buyers', createBuyer);
    app.get('/api/buyers', findBuyers);
    app.get('/api/buyers/:uid', findBuyerById);
    app.put('/api/buyers/:uid', updateBuyer);
}
