import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import userModel from "../models/user.js";

import { config } from "../../config.js";

export function createRegisterController(role) {
    const controller = {};

    controller.register = async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const existsUser = await userModel.findOne({ email });

            if (existsUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const passwordHashed = await bcryptjs.hash(password, 10);

            const randomCode = crypto.randomBytes(3).toString("hex");

            const token = jsonwebtoken.sign(
                {
                    name,
                    email,
                    password: passwordHashed,
                    role,
                    randomCode
                },
                config.JWT.secret,
                { expiresIn: "15m" }
            );

            res.cookie("registrationCookie", token, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000
            });

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: config.email.user_email,
                    pass: config.email.user_password
                }
            });

            transporter.sendMail(
                {
                    from: config.email.user_email,
                    to: email,
                    subject: "Verificación de cuenta",
                    text: "Para verificar la cuenta, utiliza este codigo " + randomCode + " expira en 15 minutos"
                },
                (error) => {
                    if (error) {
                        console.log("error" + error);
                        return res.status(500).json({ message: "error sending email" });
                    }

                    return res.status(200).json({ message: "email sent" });
                }
            );
        } catch (error) {
            console.log("error" + error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };

    controller.verifyCode = async (req, res) => {
        try {
            const { code } = req.body;
            const token = req.cookies.registrationCookie;

            if (!token) {
                return res.status(400).json({ message: "Registration session expired" });
            }

            const decoded = jsonwebtoken.verify(token, config.JWT.secret);
            const {
                randomCode: storedCode,
                name,
                email,
                password,
                role: decodedRole
            } = decoded;

            if (code !== storedCode) {
                return res.status(400).json({ message: "Invalid Code" });
            }

            const newUser = new userModel({
                name,
                email,
                password,
                role: decodedRole,
                isVerified: true
            });

            await newUser.save();

            res.clearCookie("registrationCookie");
            return res.status(201).json({ message: `${decodedRole} registered` });
        } catch (error) {
            console.log("error" + error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };

    return controller;
}
