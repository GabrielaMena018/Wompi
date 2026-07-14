import express from "express";
import wompiController from "../../controllers/wompiController";
import router from "../admins/RegsiterAdmin";

const route = express.Router();
router.route("/token").post(wompiController.generarToken)
router.route("paymentTest").post(wompiController.paymentTest)

export default router;