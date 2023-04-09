import buyerModel from './buyer-model.js';

export const findBuyers = () => buyerModel.find();
export const findBuyerById = (bid) => buyerModel.find({username: bid});
export const createBuyer = (buyer) => buyerModel.create(buyer);
export const updateBuyer = (bid, buyer) => buyerModel.updateOne({username: bid}, {$set: buyer})

