import express from "express";
import registerAdminController from "../../controllers/RegisterAdminController";

const router = express.Router();

router.route("/").post(registerAdminController.register)
router.route("/VerifiCode").post(registerAdminController.verifyCode)

export default router;