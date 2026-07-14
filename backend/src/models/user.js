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

    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["customer", "admin"], required: true},
    isVerified: {type: Boolean, default: false},
    loginAttempts:{type: Number, default: 0},
    timeOut: {type: Number, default: 0}

}, {
    timestamps: true
})

export default model("Users", userSchema)