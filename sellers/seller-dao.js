import sellerModel from './seller-model.js';

export const createSeller = (seller) => sellerModel.create(seller);
export const findSellerByUsernameAndPassword = (username, password) => sellerModel.findOne({ username: username, password: password });
// export const updateSeller = (sid, seller) => sellerModel.updateOne({ username: sid }, { $set: seller })

