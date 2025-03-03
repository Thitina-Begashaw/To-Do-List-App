import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import ToDoRoute from "./Routes/ToDoRoute.js"
import cors from 'cors';
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/ToDo" , ToDoRoute)
mongoose.connect(process.env.MONGO_URI)
.then(
    app.listen(process.env.PORT , ()=>{
        console.log("App is connected to server and Database on the port of ", process.env.PORT)
    })
)
.catch(err => console.error("Failed to connect to MongoDB", err));