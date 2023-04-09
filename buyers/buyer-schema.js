import mongoose from 'mongoose';

const schema = mongoose.Schema({
                                   _id: {type: Number, required: [true, "Buyer id required"]},
                                   username: {
                                       type: String,
                                       required: [true, "Buyer username required"]
                                   },
                                   password: {
                                       type: String,
                                       required: [true, "Buyer password required"],
                                       minlength:[6,'Minimum password length is 6 characters']
                                   },
                                   first_name: {
                                       type: String,
                                       required: [true, "Buyer first name required"]
                                   },
                                   last_name: {
                                       type: String,
                                       required: [true, "Buyer last name required"]
                                   },
                                   email: {type: String, required: [true, "Buyer email required"]},
                                   addresses: {
                                       type: Array,
                                       required: [true, "Buyer address required"]
                                   },
                                   phone: {
                                       type: Number,
                                       required: [true, "Buyer phone number required"],
                                       minlength:[10,'Minimum phone length is 10 characters'],
                                       maxlength:[10,'Minimum phone length is 10 characters']
                                   },
                                   gender: {
                                       type: String,
                                       required: [true, "Buyer gender required"],
                                       enum: { values: ['Female', 'Male', 'Other'],
                                           message: '{VALUE} gender is not supported'}
                                   },
                                   dob: {type: Number, required: [true, "Buyer dob required"]},
                               }, {collection: 'buyer'});
export default schema;