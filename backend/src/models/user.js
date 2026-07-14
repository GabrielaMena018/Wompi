/**
 *  name,
    email,
    password,
    isVerified,
    loginAttempts,
    timeOut

*/

import mongoose, {Schema, model} from "mongoose";
const userSchema = new Schema({

    name: {type: String},
    email: {type: String},
    password: {type: String},
    isVerified: {type: Boolean},
    loginAttempts:{type: Number},
    timeOut: {type: Number}

}, {
    timestamps: true,
    strict: false
})

export default model("Users", userSchema)