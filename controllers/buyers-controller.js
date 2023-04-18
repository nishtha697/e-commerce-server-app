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
        res.status(500).json({ error: err.message });
    }

}

const updateBuyerAddress = async (req, res) => {
    const buyerUsernameToUpdate = req.params.username;
    const address = req.body.address;
    console.log(address)
    console.log(buyerUsernameToUpdate)

    try {
        await buyersDao.updateBuyer(buyerUsernameToUpdate, address);
        res.status(200).json({message: "Address added successfully", address: address});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export default (app) => {
    app.post('/api/buyers', createNewBuyer);
    app.get('/api/buyers/authenticate', authenticateBuyer);
    app.put('/api/buyers/:username', updateBuyerAddress);
}
