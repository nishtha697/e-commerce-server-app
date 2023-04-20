import productModel from './product-model.js';

export const createProduct = (product) => productModel.create(product);
export const findProducts = () => productModel.find();
export const findProductsByFilter = (filter) => productModel.find(filter);
export const findProductById = (pid) => productModel.findOne({ product_id: pid });
export const updateProduct = (pid, product) => productModel.updateOne({ product_id: pid }, { $set: product }, { acknoledge: true })

export const getCatgories = () => productModel.aggregate([
    {
        '$addFields': {
            'category0': { '$arrayElemAt': ['$category', 0] },
            'category1': { '$arrayElemAt': ['$category', 1] },
            'category2': { '$arrayElemAt': ['$category', 2] }
        }
    }, {
        '$group': {
            '_id': { 'category1': '$category0', 'category2': '$category1', 'category3': '$category2' }
        }
    }, {
        '$group': {
            '_id': { 'category1': '$_id.category1', 'category2': '$_id.category2' },
            'category3': { '$push': '$_id.category3' }
        }
    }, {
        '$group': {
            '_id': '$_id.category1',
            'category2': { '$push': { 'k': '$_id.category2', 'v': '$category3' } }
        }
    }, {
        '$project': {
            '_id': 0, 'category1': '$_id', 'category2': { '$arrayToObject': '$category2' }
        }
    }
])


export const findProductBySeller = (seller_username) => productModel.aggregate([
    {
        '$match': {
            seller: seller_username
        }
    },
    {
        '$lookup': {
            'from': 'order',
            'localField': 'product_id',
            'foreignField': 'shipments.products.product_id',
            'as': 'orders'
        }
    }, {
        '$addFields': {
            'order_count': {
                '$size': '$orders'
            }
        }
    }, {
        '$project': {
            'orders': 0
        }
    }
])