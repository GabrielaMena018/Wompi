/**
 *  customerId
    quantity
    purchaseDate
    total
    paymentStatus
    transactionId

 */
import mongoose, {Schema, model} from "mongoose";
const ticketSchema = new Schema({

    customerId: {type: Schema.Types.ObjectId, ref: "Users", required: true},
    quantity: {type: Number, required: true},
    purchaseDate: {type: Date, default: Date.now},
    total: {type: Number, required: true},
    paymentStatus: {type: String, enum: ["pending", "approved", "declined"], default: "pending"},
    transactionId: {type: String}

}, {
    timestamps: true
})

export default model("Tickets", ticketSchema)
