import express from "express";
import registerCustomerController from "../../controllers/RegisterCustomerController.js";
import loginCustomerController from "../../controllers/LoginCustomerController.js";
import logoutController from "../../controllers/logoutController.js";

const router = express.Router();

router.route("/register").post(registerCustomerController.register)
router.route("/verify-code").post(registerCustomerController.verifyCode)
router.route("/login").post(loginCustomerController.login)
router.route("/logout").post(logoutController.logout)

export default router;
