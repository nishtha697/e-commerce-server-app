import sellerModel from './seller-model.js';

export const findSellers = () => sellerModel.find();
export const findSellerById = (sid) => sellerModel.find({username: sid});
export const createSeller = (seller) => sellerModel.create(seller);
export const updateSeller = (sid, seller) => sellerModel.updateOne({username: sid}, {$set: seller})

