import express from "express";
import registerAdminController from "../../controllers/RegisterAdminController.js";

const router = express.Router();

router.route("/register").post(registerAdminController.register)
router.route("/verify-code").post(registerAdminController.verifyCode)

export default router;