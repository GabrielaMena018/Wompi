import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";

export const validateAuthCookie = (allowedRoles = []) => {
    return (req, res, next) => {
        try {
            const token = req.cookies.authToken;

            if (!token) {
                return res.status(401).json({ message: "No autenticado" });
            }

            const decoded = jsonwebtoken.verify(token, config.JWT.secret);

            if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: "No tienes permisos para acceder a este recurso" });
            }

            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token inválido o expirado" });
        }
    };
};
