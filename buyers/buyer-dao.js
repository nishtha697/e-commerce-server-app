import buyerModel from './buyer-model.js';

export const createBuyer = (buyer) => buyerModel.create(buyer);
export const findBuyerByUsernameAndPassword = (username, password) => buyerModel.findOne({ username: username, password: password });
export const updateBuyer = (username, address) =>  buyerModel.findOneAndUpdate(
    { username: username },
    { $push: { addresses: address } }
);

