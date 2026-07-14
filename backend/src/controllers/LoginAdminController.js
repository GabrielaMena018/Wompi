import { createLoginController } from "./loginFactory.js";

const loginAdminController = createLoginController("admin");

export default loginAdminController;
