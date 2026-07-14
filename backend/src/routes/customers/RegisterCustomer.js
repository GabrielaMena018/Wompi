import express from "express";
import registerCustomerController from "../../controllers/RegisterCustomerController.js";

const router = express.Router();

router.route("/register").post(registerCustomerController.register)
router.route("/verify-code").post(registerCustomerController.verifyCode)

export default router;
