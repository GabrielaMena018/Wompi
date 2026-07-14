/**
 *  customerId,
    quantity,
    purchaseDate,
    total,
    paymentStatus,
    transactionId

 */

import ticketsModel from "../models/tickets";

//Array de funciones
const ticketsController = {};

///SELECT
ticketsController.getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketsModel
        .find()
        .populate("customerId", "name email")

        return res.status(200).json(tickets)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Interal server error"})
    }
}

//INSERT
ticketsController.insertTickets = async (req, res) => {
  try {
      const{
        customerId,
        quantity,
        purchaseDate,
        total,
        paymentStatus,
        transactionId
    } = req.body

   const newTickets = new ticketsModel({customerId,
        quantity,
        purchaseDate,
        total,
        paymentStatus,
        transactionId})

    await newTickets.save();

    return res.status(200).json("Transación completada correctamente")
  } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Interal server error"})
  }


}