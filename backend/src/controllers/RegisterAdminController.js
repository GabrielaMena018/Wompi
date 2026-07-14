import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"

import userModel from "../models/user.js"

import { config } from "../../config.js"
import { register } from "module"
import { text } from "stream/consumers"
import { error } from "console"

const registerUserController = {}

registerUserController.register = async(req, res) => {
    try {
        //Solicitar lso datos a guardar
        const{
                name,
                email,
                password,
                isVerified,
                loginAttempts,
                timeOut
        } = req.body

        //Validar si el correo existe en la base de datos
        const existsUser = await userModel.findOne({email});

        if(existsUser){
            return res.status(400).json({message: "User already exist"})
        }

        //Encriptar contraseña
        const passwordHashed = await bcryptjs.hash(password, 10);

        //Generar codigo aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex")

        //Generar todo en un token
        const token = jsonwebtoken.sign(

            //Que vamos aguardar
            {
                name,
                email,
                password: passwordHashed,
                isVerified,
                loginAttempts,
                timeOut
            },
            config.JWT.secret,

            {expiresIn: "15m"}
        );

        //Guardamos el token en una cookie
        res.cookie("registrationCookie", token,{maxAge: 15 * 60 * 1000})


        //Enviar el correo electronico
        //Transporter
        const Transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            },
        });

        //MailOptions
        const mailOptions = {
            from: config.email.user_email,
            to: "email",
            subject: "Verificación de cuenta",
            text: "Para verificar la cuenta, utiliza este codigo " + randomCode + " expira en 15 minutos",
        };

        //Enviar el codrrio
        Transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                console.log("error" + error);
                return res.status(500).json({message: "error sending email"});
            }

            return res.status(200).json({message: "email sent"});
        });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};
//Verificar el codigo que acabamos de enviar
registerUserController.verifyCode = async(req, res) =>{
    try {
        const {verifyCodeRequest} = req.body;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const {
                randomCode: storedCode,
                name,
                email,
                password,
                isVerified,
                loginAttempts,
                timeOut
        } = decoded

        if(verifyCodeRequest !== storedCode){
            return res.status(400).json({message: "Invalid Code"});
        }

        const newUser = userModel({
             name,
             email,
             password,  
             isVerified: true,
             loginAttempts,
             timeOut
        });

        await newCustomer.save()

        res.clearCookie("registrationCookie");
        return res.status(200).json({message: "Customer registered"});
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export default registerUserController;

