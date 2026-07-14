/**
 *  customerId,
    quantity,
    purchaseDate,
    total,
    paymentStatus,
    transactionId

 */

import ticketsModel from "../models/tickets.js";

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

//UPDATE
ticketsController.updateTickets = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            customerId,
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            transactionId
        } = req.body;

        const updatedTickets = await ticketsModel.findByIdAndUpdate(
            id,
            { customerId, quantity, purchaseDate, total, paymentStatus, transactionId },
            { new: true }
        );

        if (!updatedTickets) {
            return res.status(404).json({ message: "Compra no encontrada" });
        }

        return res.status(200).json(updatedTickets)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Interal server error"})
    }
}

//DELETE
ticketsController.deleteTickets = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTickets = await ticketsModel.findByIdAndDelete(id);

        if (!deletedTickets) {
            return res.status(404).json({ message: "Compra no encontrada" });
        }

        return res.status(200).json({ message: "Compra eliminada correctamente" })
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Interal server error"})
    }
}

export default ticketsController;