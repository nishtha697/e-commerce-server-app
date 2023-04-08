import userModel from './user-model.js';

export const findUsers = () => userModel.find();
export const findUserById = (uid) => userModel.find({username: uid});
export const createUser = (user) => userModel.create(user);
export const updateUser = (uid, user) => userModel.updateOne({username: uid}, {$set: user})

