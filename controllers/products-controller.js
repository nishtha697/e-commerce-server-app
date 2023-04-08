import * as productsDao from '../products/product-dao.js'

const findProducts = async (req, res) => {
    const products = await productsDao.findProducts()
    res.json(products);
}

const findProductById = async (req, res) => {
    const product = await productsDao.findProductById(req.params.pid)
    res.json(product);
}

const createProduct = async (req, res) => {
    const newProduct = req.body;
    newProduct.product_id = (new Date()).getTime();
    const insertedProduct = await productsDao.createProduct(newProduct);
    res.json(insertedProduct);
}

const updateProduct = async (req, res) => {
    const productIdToUpdate = req.params.pid;
    const updates = req.body;
    const status = await productsDao.updateProduct(productIdToUpdate, updates);
    res.json(status);
}

export default (app) => {
    app.post('/api/products', createProduct);
    app.get('/api/products', findProducts);
    app.get('/api/products/:pid', findProductById);
    app.put('/api/products/:pid', updateProduct);
}
