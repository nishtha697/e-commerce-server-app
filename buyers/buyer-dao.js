import buyerModel from './buyer-model.js';

export const createBuyer = (buyer) => buyerModel.create(buyer);
export const findBuyerByUsernameAndPassword = (username, password) => buyerModel.findOne({ username: username, password: password });
// export const updateBuyer = (bid, buyer) => buyerModel.updateOne({ username: bid }, { $set: buyer })

