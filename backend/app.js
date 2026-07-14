import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"

import adminRegisterRoutes from "./src/routes/admins/RegsiterAdmin.js"
import customerRegisterRoutes from "./src/routes/customers/RegisterCustomer.js"
import wompiRoutes from "./src/routes/wompi/wompi.js"

//Libreria express
const app = express()

app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))

app.use(cookieParser())

app.use(express.json())

app.use("/api/admins", adminRegisterRoutes)
app.use("/api/customers", customerRegisterRoutes)
app.use("/api/wompi", wompiRoutes)

export default app;