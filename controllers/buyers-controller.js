import * as buyersDao from "../buyers/buyer-dao.js";

const createNewBuyer = async (req, res) => {
    const newBuyer = req.body;
    newBuyer._id = Date.now()
    try {
        const insertedBuyer = await buyersDao.createBuyer(newBuyer);
        res.status(200).json(insertedBuyer);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).json({ errors: err.errors });
        } else if (err.code === 11000) {
            // handle duplicate key error (E11000)
            res.status(422).json({ error: err.message });
        } else {
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

const addBuyerAddress = async (req, res) => {
    const buyerUsernameToUpdate = req.params.username;
    const address = req.body.address;
    try {
        await buyersDao.addBuyerAddress(buyerUsernameToUpdate, address);
        res.status(200).json({ message: "Address added successfully", address: address });
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).json({ errors: err.errors });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
}

const deleteBuyerAddress = async (req, res) => {
    const buyerUsernameToUpdate = req.params.username;
    const addressId = req.body.addressId;
    try {
        await buyersDao.deleteBuyerAddress(buyerUsernameToUpdate, addressId);
        res.status(200).json({ message: "Address deleted successfully", addressId: addressId });
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).json({ errors: err.errors });
        } else {
            res.status(500).json({ error: err.message });
        }

    }
}

const updateBuyerAddress = async (req, res) => {
    const buyerUsernameToUpdate = req.params.username;
    const address = req.body.address;
    try {
        await buyersDao.updateBuyerAddress(buyerUsernameToUpdate, address);
        res.status(200).json({ message: "Address updated successfully", address: address });
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).json({ errors: err.errors });
        } else {
            res.status(500).json({ error: err.message });
        }

    }
}

const updateBuyerProfile = async (req, res) => {
    const buyerUsernameToUpdate = req.params.username;
    const newProfile = req.body.newProfile;
    try {
        const response = await buyersDao.updateBuyer(buyerUsernameToUpdate, newProfile);
        res.status(200).json({ message: "Profile updated successfully", newProfile: response });
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).json({ errors: err.errors });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
}

const deleteBuyer = async (req, res) => {
    const { username } = req.query;
    try {
        const buyer = await buyersDao.deleteBuyer(username);
        res.status(200).json(buyer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export default (app) => {
    app.post('/api/buyers', createNewBuyer);
    app.get('/api/buyers/authenticate', authenticateBuyer);
    app.put('/api/buyers/add-address/:username', addBuyerAddress);
    app.put('/api/buyers/update-address/:username', updateBuyerAddress);
    app.put('/api/buyers/delete-address/:username', deleteBuyerAddress);
    app.put('/api/buyers/update-profile/:username', updateBuyerProfile);
    app.get('/api/buyers/delete', deleteBuyer);
}
