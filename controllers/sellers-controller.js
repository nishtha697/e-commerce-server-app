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
        console.log(seller)
        if (seller == null) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json(seller);
        }
    } catch (err) {
        res.status(err.status).send(err.message);
    }

}


export default (app) => {
    app.post('/api/seller', createNewSeller);
    app.get('/api/seller/authenticate', authenticateSeller);
}
