import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import userModel from "../models/user.js";

import { config } from "../../config.js";

export function createLoginController(role) {
    const controller = {};

    controller.login = async (req, res) => {
        try {
            const { email, password } = req.body;

            const userFound = await userModel.findOne({ email, role });

            if (!userFound) {
                return res.status(400).json({ message: "User not found" });
            }

            if (userFound.timeOut && userFound.timeOut > Date.now()) {
                return res.status(403).json({ message: "Blocked account" });
            }

            const isMatch = await bcryptjs.compare(password, userFound.password);

            if (!isMatch) {
                userFound.loginAttempts = (userFound.loginAttempts || 0) + 1;

                if (userFound.loginAttempts >= 5) {
                    userFound.timeOut = Date.now() + 5 * 60 * 1000;
                    userFound.loginAttempts = 0;

                    await userFound.save();

                    return res.status(403).json({ message: "Blocked account for many attempts" });
                }

                await userFound.save();

                return res.status(401).json({ message: "Wrong password" });
            }

            userFound.loginAttempts = 0;
            userFound.timeOut = null;
            await userFound.save();

            const token = jsonwebtoken.sign(
                { id: userFound._id, role },
                config.JWT.secret,
                { expiresIn: "30d" }
            );

            res.cookie("authToken", token, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({ message: "Login successfully" });
        } catch (error) {
            console.log("error" + error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };

    return controller;
}
