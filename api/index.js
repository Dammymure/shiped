import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { UserRoute } from './routes/UserRoute.js'
import { AdminRoute } from "./routes/AdminRoute.js";





dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


// app.use("/auth", authRoutes)
app.use("/user", UserRoute)
app.use("/admin", AdminRoute)

// Serve the uploads folder as a static directory
app.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).send('Something broke')
    
})



/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
 .connect(process.env.MONGO_URL)
 .then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

 })
 .catch((error) => console.log(`${error} did not connect`));
