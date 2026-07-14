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

    customerId: {type: Schema.Types.ObjectId, ref: "Users"},
    quantity: {type: Number},
    purchaseDate: {type: Date},
    total: {type: Number},
    paymentStatus: {type: String},
    transactionId: {type: String}

}, {
    timestamps: true
})

export default model("Tickets", ticketSchema)
