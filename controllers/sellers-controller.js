import * as sellersDao from "../sellers/seller-dao.js";

const createNewSeller = async (req, res) => {
    const newSeller = req.body;
    newSeller._id = (new Date()).getTime();
    try {
        const insertedSeller = await sellersDao.createSeller(newSeller);
        res.status(200).json(insertedSeller);
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

const authenticateSeller = async (req, res) => {
    const { username, password } = req.query;
    try {
        const seller = await sellersDao.findSellerByUsernameAndPassword(username, password);
        if (seller == null) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json(seller);
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send(err.message);
    }

}

const updateSellerProfile = async (req, res) => {
    const sellerUsernameToUpdate = req.params.username;
    const newProfile = req.body.newProfile;
    try {
        const response = await sellersDao.updateSeller(sellerUsernameToUpdate, newProfile);
        res.status(200).json({ message: "Profile updated successfully", newProfile: response });
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).json({ errors: err.errors });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
}

const findSellerByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const seller = await sellersDao.findSellerByUsername(username);
        if (!seller) {
            res.status(404).json({ error: "Seller not found" });
        } else {
            const { name, email, phone, business_address } = seller;
            res.status(200).json({ name, email, phone, business_address });
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send(err.message);
    }
}


export default (app) => {
    app.post('/api/seller', createNewSeller);
    app.get('/api/seller/authenticate', authenticateSeller);
    app.get('/api/seller/:username', findSellerByUsername);
    app.put('/api/seller/update-profile/:username', updateSellerProfile);
}
