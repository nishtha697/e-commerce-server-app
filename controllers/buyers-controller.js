import * as buyersDao from "../buyers/buyer-dao.js";

const createNewBuyer = async (req, res) => {
    const newBuyer = req.body;
    newBuyer._id = (new Date()).getTime();
    try {
        const insertedBuyer = await buyersDao.createBuyer(newBuyer);
        res.status(200).json(insertedBuyer);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).json({ errors: err.errors });
        } else if (err.code === 11000) {
            // handle duplicate key error (E11000)
            console.log(`Error: ${err.message}`);
            res.status(422).json({ error: err.message });
        } else {
            console.log(`Error: ${err}`);
            res.status(500).json({ error: err.message });
        }
    }
}

const authenticateBuyer = async (req, res) => {
    const { username, password } = req.query;
    try {
        const buyer = await buyersDao.findBuyerByUsernameAndPassword(username, password);
        if (buyer == null) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json(buyer);
        }
    } catch (err) {
        res.status(err.status).send(err.message);
    }

}

// const updateBuyer = async (req, res) => {
//     const buyerIdToUpdate = req.params.pid;
//     const updates = req.body;
//     const status = await buyersDao.updateBuyer(buyerIdToUpdate, updates);
//     res.json(status);
// }

export default (app) => {
    app.post('/api/buyers', createNewBuyer);
    app.get('/api/buyers/authenticate', authenticateBuyer);
    // app.put('/api/buyers/:uid', updateBuyer);
}
