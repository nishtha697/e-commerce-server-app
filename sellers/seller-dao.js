import sellerModel from './seller-model.js';

export const createSeller = (seller) => sellerModel.create(seller);
export const findSellerByUsernameAndPassword = (username, password) => sellerModel.findOne({ username: username, password: password });
export const updateSeller = (username, newProfile) => sellerModel.findOneAndUpdate(
    { username: username },
    { ...newProfile},
    { new: true }
);


