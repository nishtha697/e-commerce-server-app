import * as shoppingCartDao from '../shopping-cart/shopping-cart-dao.js'

const createNewShoppingCart = async (req, res) => {
    const newShoppingCart = req.body;
    try {
        const insertedShoppingCart = await shoppingCartDao.createShoppingCart(newShoppingCart);
        res.status(200).json(insertedShoppingCart);
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: err.message });
    }
}

const deleteShoppingCartByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const deleteResult = await shoppingCartDao.deleteShoppingCart(username);
        if (deleteResult.deletedCount === 0) {
            res.status(404).json({ error: "Shopping cart not found" });
        } else {
            res.status(200).json({ message: "Shopping cart deleted successfully" });
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: err.message });
    }
};

const findShoppingCartByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const shoppingCart = await shoppingCartDao.findShoppingCartByUsername(username);
        if (!shoppingCart) {
            res.status(404).json({ error: "Shopping cart not found" });
        } else {
            res.status(200).json(shoppingCart);
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: err.message });
    }
};

const addProductToShoppingCart = async (req, res) => {
    const username = req.params.username;
    const product = req.body;
    try {
        const updateResult = await shoppingCartDao.addProductToShoppingCart(username, product);
        if (updateResult.nModified === 0 && updateResult.upserted === undefined) {
            res.status(404).json({ error: "Shopping cart not found" });
        } else {
            res.status(200).json({ message: "Product added to shopping cart successfully" });
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: err.message });
    }
};

const deleteProductFromShoppingCart = async (req, res) => {
    const username = req.params.username;
    const productId = req.params.productId;
    try {
        const updateResult = await shoppingCartDao.deleteProductFromShoppingCart(username, productId);
        if (updateResult.nModified === 0) {
            res.status(404).json({ error: "Shopping cart or product not found" });
        } else {
            res.status(200).json({ message: "Product deleted from shopping cart successfully", deletedProductId: productId } );
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: err.message });
    }
};

const updateProductQuantity = async (req, res) => {
    const username = req.params.username;
    const productId = req.params.productId;
    const newQuantity = req.body.quantity;

    try {
        const updateResult = await shoppingCartDao.updateProductQuantity(username, productId, newQuantity);
        if (updateResult.nModified === 0 && updateResult.upserted === undefined) {
            res.status(404).json({ error: "Shopping cart or product not found" });
        } else {
            res.status(200).json({ message: "Product quantity updated successfully", productId: productId, quantity: newQuantity });
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: err.message });
    }
};

export default (app) => {
    app.post('/api/shopping-cart', createNewShoppingCart);
    app.get('/api/shopping-cart/:username', findShoppingCartByUsername);
    app.delete('/api/shopping-cart/:username', deleteShoppingCartByUsername);
    app.put('/api/shopping-cart/:username/add', addProductToShoppingCart);
    app.put('/api/shopping-cart/:username/delete/:productId', deleteProductFromShoppingCart);
    app.put('/api/shopping-cart/:username/update/:productId', updateProductQuantity);
}
