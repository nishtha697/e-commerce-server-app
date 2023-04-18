import * as productsDao from '../products/product-dao.js'

const createNewProduct = async (req, res) => {
    const newProduct = req.body;
    newProduct.product_id = (new Date()).getTime();
    try {
        const insertedProduct = await productsDao.createProduct(newProduct);
        res.status(200).json(insertedProduct);
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: err.message });
    }
}

const getAllProducts = async (req, res) => {
    const products = await productsDao.findProducts()
    res.json(products);
}

const getProductsById = async (req, res) => {
    try {
        const product = await productsDao.findProductById(req.params.pid)
        if (product == null || product.length === 0) {
            res.status(404).json({ error: 'No product found!' });
        } else {
            res.status(200).json(product);
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: err.message });
    }
}

const getProductsBySeller = async (req, res) => {
    try {
        const products = await productsDao.findProductBySeller(req.params.seller)
        if (products == null || products.length === 0) {
            res.status(404).json({ error: 'No products found for the seller!' });
        } else {
            res.status(200).json(products);
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: err.message });
    }
}

const updateProduct = async (req, res) => {
    const productIdToUpdate = req.params.pid;
    const updates = req.body;
    try {
        const status = await productsDao.updateProduct(productIdToUpdate, updates);
        res.status(200).json(status);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).json({ errors: err.errors });
        } else {
            console.log(`Error: ${err}`);
            res.status(500).json({ error: err.message });
        }
    }
}

const getUniqueCatgories = async (req, res) => {
    try {
        const values = await productsDao.getCatgories()
        let result = {}
        values.forEach(category => {
            result[category.category1] = category.category2
        })
        res.status(200).json(result);
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: err.message });
    }
}

export default (app) => {
    app.post('/api/products', createNewProduct);
    app.get('/api/products/categories', getUniqueCatgories);
    app.get('/api/products', getAllProducts);
    app.get('/api/products/:pid', getProductsById);
    app.get('/api/products/seller/:seller', getProductsBySeller);
    app.put('/api/products/:pid', updateProduct);
}
