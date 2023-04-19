import shoppingCartModel from './shopping-cart-model.js';

export const findShoppingCartByUsername = (username) => shoppingCartModel.findOne({ username: username });
export const addProductToShoppingCart = async (username, product) => {
    const existingProduct = await shoppingCartModel.findOne({ username: username, "products.productId": product.productId });
    if (existingProduct) {
        const updatedProduct = existingProduct.products.find((p) => p.productId === product.productId);
        updatedProduct.quantity += product.quantity;
        return existingProduct.save();
    } else {
        return shoppingCartModel.findOneAndUpdate(
            { username: username },
            { $push: { products: product } },
            { upsert: true, new: true }
        );
    }
};


export const deleteProductFromShoppingCart = (username, productId) => {
    return shoppingCartModel.updateOne(
        { username: username },
        { $pull: { products: { productId: productId } } },
        { acknoledge: true }
    );
};

export const updateProductQuantity = (username, productId, newQuantity) => {
    return shoppingCartModel.findOneAndUpdate(
        { username: username, "products.productId": productId },
        { $set: { "products.$.quantity": newQuantity } },
        { new: true }
    )
        .then((shoppingCart) => {
            if (!shoppingCart) {
                // Shopping cart not found, add new product entry
                return shoppingCartModel.findOneAndUpdate(
                    { username: username },
                    { $push: { products: { productId: productId, quantity: newQuantity } } },
                    { new: true, upsert: true }
                );
            } else {
                return shoppingCart;
            }
        })
        .catch((err) => {
            throw err;
        });
};



export const deleteShoppingCart = (username) => {
    return shoppingCartModel.deleteOne({ username: username });
};


