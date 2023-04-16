import * as buyersDao from "../buyers/buyer-dao.js";

const findBuyerByUsernameAndPassword = async (req, res) => {
    const { username, password } = req.query;
    const buyer = await buyersDao.findBuyerByUsernameAndPassword(username, password)
    res.json(buyer);
}

const createBuyer = async (req, res) => {
    const newBuyer = req.body;
    newBuyer._id = (new Date()).getTime();
    try {
        const insertedBuyer = await buyersDao.createBuyer(newBuyer);
        res.json(insertedBuyer);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).json({ errors: err.errors });
        } else {
            res.status(err.status).send(err.message);
        }
    }
}

const updateBuyer = async (req, res) => {
    const buyerIdToUpdate = req.params.pid;
    const updates = req.body;
    const status = await buyersDao.updateBuyer(buyerIdToUpdate, updates);
    res.json(status);
}

const findBuyerById = async (req, res) => {
    const buyer = await buyersDao.findBuyerById(req.params.uid)
    res.json(buyer);
}

const findBuyers = async (req, res) => {
    const buyers = await buyersDao.findBuyers()
    res.json(buyers);
}

export default (app) => {
    app.get('/api/buyers/authenticate', findBuyerByUsernameAndPassword);
    app.get('/api/buyers/:uid', findBuyerById);
    app.post('/api/buyers', createBuyer);
    app.put('/api/buyers/:uid', updateBuyer);
    app.get('/api/buyers', findBuyers);
}
