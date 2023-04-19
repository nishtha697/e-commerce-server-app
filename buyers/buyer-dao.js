import buyerModel from './buyer-model.js';

export const createBuyer = (buyer) => buyerModel.create(buyer);
export const findBuyerByUsernameAndPassword = (username, password) => buyerModel.findOne({ username: username, password: password });

export const addBuyerAddress = (username, address) => buyerModel.findOneAndUpdate(
    { username: username },
    { $push: { addresses: address } }
);

export const updateBuyerAddress = (username, updatedAddress) => buyerModel.findOneAndUpdate(
    { username: username, 'addresses.id': updatedAddress.id },
    { $set: { 'addresses.$': updatedAddress } },
    { new: true }
);

export const deleteBuyerAddress = (username, addressId) => buyerModel.findOneAndUpdate(
    { username: username },
    { $pull: { addresses: { id: addressId } } }
);

export const updateBuyer = (username, newProfile) => buyerModel.findOneAndUpdate(
    { username: username },
    { ...newProfile },
    { new: true }
);
