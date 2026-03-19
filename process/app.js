import express from 'express';
import services from './config.js'
import cors from "cors"
import  {dbService} from './steps/db.js'
import dotenv from "dotenv"
import {auth} from './steps/auth.js'
const {geminiAI,DataBase}=services;
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.get('/',async(req,res)=>{
    res.send("server is running")
})
app.post("/signup",async(req,res)=>{
    const {email,password,name}=req.body;
    try{
        const data=dbService.SignIn(email,password)
        const user=data.user

        await dbService.saveUsers(name,email);
        res.json({
            message:"sign up successful"
        })
    }catch(Err){
        res.status(400).json({error:Err.message})
    }
})
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const data=await dbService.LogIn(email,password);
        res.json({
            message:"login successful",
            session: data.session,
            user: data.user
            
        })
    }catch(Error){
         res.status(401).json({ error: Error.message });
  
    }

})

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server is listining on port", PORT)
})