import * as productsDao from '../products/product-dao.js'

const createNewProduct = async (req, res) => {
    const newProduct = req.body;
    newProduct.product_id = Date.now()
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

const getUniqueSellers = async (req, res) => {
    try {
        const sellers = await productsDao.getSellers()
        const sellerNames = sellers.map(seller => seller.seller);
        res.status(200).json(sellerNames);
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: err.message });
    }
}

const getFilteredProducts = async (req, res) => {
    const { title, description, minPrice, maxPrice, category } = req.body
    const query = {}
    if (title && title !== "") query['title'] = { $regex: title, $options: "i" }
    if (description && description !== "") query['description'] = { $regex: description, $options: "i" }
    if (minPrice && minPrice > 0) query['price'] = { $gte: minPrice }
    if (maxPrice && maxPrice > 0) query['price'] = { ...query['price'], $lte: maxPrice }
    if (category && Object.keys(category).length > 0) {
        const finalCategories = []
        Object.keys(category).forEach(key => {
            if (category[key]) {
                finalCategories.push(category[key])
            }
        })
        if (finalCategories.length > 0) query['category'] = { $all: finalCategories }
    }
    console.log('Filter Products Query', query)
    try {
        const filteredProducts = await productsDao.findProductsByFilter(query)
        if (filteredProducts == null || filteredProducts.length === 0) {
            res.status(404).json({ error: 'No products found!' });
        } else {
            res.status(200).json(filteredProducts);
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: err.message });
    }
}

export default (app) => {
    app.post('/api/products', createNewProduct);
    app.get('/api/products/all-categories', getUniqueCatgories);
    app.get('/api/products/all-sellers', getUniqueSellers)
    app.get('/api/products/all', getAllProducts);
    app.post('/api/products/filtered', getFilteredProducts);
    app.get('/api/products/:pid', getProductsById);
    app.get('/api/products/seller/:seller', getProductsBySeller);
    app.put('/api/products/:pid', updateProduct);

}
