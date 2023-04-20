import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    incareof:{
        type: String,
    },
    address1: {
        type: String,
        required: [true, 'Address line 1 is required']
    },
    address2: {
        type: String
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    state: {
        type: String,
        required: [true, 'State is required']
    },
    zipcode: {
        type: String,
        required: [true, 'Zipcode is required']
    },
});

export default addressSchema;
