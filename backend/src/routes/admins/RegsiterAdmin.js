import express from "express";
import registerAdminController from "../../controllers/RegisterAdminController.js";
import loginAdminController from "../../controllers/LoginAdminController.js";
import logoutController from "../../controllers/logoutController.js";

const router = express.Router();

router.route("/register").post(registerAdminController.register)
router.route("/verify-code").post(registerAdminController.verifyCode)
router.route("/login").post(loginAdminController.login)
router.route("/logout").post(logoutController.logout)

export default router;