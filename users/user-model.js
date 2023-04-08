import mongoose from 'mongoose';
import userSchema from './users-schema.js'

const userModel = mongoose.model('UserModel', userSchema);

export default userModel;

