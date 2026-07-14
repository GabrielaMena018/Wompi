import express from "express"
import ticketsController from "../../controllers/ticketsController.js"
import { validateAuthCookie } from "../../middlewares/authMiddleware.js"

const router = express.Router();

router.route("/")
    .get(validateAuthCookie(["admin"]), ticketsController.getAllTickets)
    .post(validateAuthCookie(["customer"]), ticketsController.insertTickets)

router.route("/:id")
    .put(validateAuthCookie(["admin", "customer"]), ticketsController.updateTickets)
    .delete(validateAuthCookie(["admin"]), ticketsController.deleteTickets)

export default router;
