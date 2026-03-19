import express from 'express';
import services from './config.js'
import cors from "cors"
import  {dbService} from './steps/db.js'
import dotenv from "dotenv"
const {geminiAI,DataBase}=services;
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.get('/',async(req,res)=>{
    res.send("server is running")
})
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server is listining on port", PORT)
})