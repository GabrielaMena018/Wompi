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

    name: {type: String },
    email: {type: String },
    password: {type: String},
    role: {type: String, enum: ["customer", "admin"]},
    isVerified: {type: Boolean},
    loginAttempts:{type: Number, default: 0},
    timeOut: {type: Date, default: null}

}, {
    timestamps: true
})

export default model("Users", userSchema)