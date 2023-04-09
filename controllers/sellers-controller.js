import * as sellersDao from "../sellers/seller-dao.js";

const findSellers = async (req, res) => {
    const sellers = await sellersDao.findSellers()
    res.json(sellers);
}

const findSellerById = async (req, res) => {
    const seller = await sellersDao.findSellerById(req.params.uid)
    res.json(seller);
}

const createSeller = async (req, res) => {
    const newSeller = req.body;
    newSeller._id = (new Date()).getTime();
    const insertedSeller = await sellersDao.createSeller(newSeller);
    res.json(insertedSeller);
}

const updateSeller = async (req, res) => {
    const sellerIdToUpdate = req.params.pid;
    const updates = req.body;
    const status = await sellersDao.updateSeller(sellerIdToUpdate, updates);
    res.json(status);
}

export default (app) => {
    app.post('/api/sellers', createSeller);
    app.get('/api/sellers', findSellers);
    app.get('/api/sellers/:uid', findSellerById);
    app.put('/api/sellers/:uid', updateSeller);
}
