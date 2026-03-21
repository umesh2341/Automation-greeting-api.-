import express from 'express';
import services from './config.js'
import cors from "cors"
import  {dbService} from './steps/db.js'
import dotenv from "dotenv"
import {auth} from './steps/auth.js'
import { Aifunction } from './steps/google.js';
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
        const data=await dbService.SignIn(email,password)
        const user=data.user.id;


        await dbService.saveUsers(user,name,email);
        res.json({
            message:"signin successful"
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
app.post('/chat',auth,async(req,res)=>{
    const {role,message}=req.body;
    try{
        const datau=await dbService.addMessage(req.user.id,role,message)
        const check=await dbService.getHistory(req.user.id)
        const getName=await dbService.getUserName(req.user.id)
        let airesponse;
        if(check.length==0){
             airesponse=await Aifunction(getName)
        }else{
             airesponse=await Aifunction(message)
        }
        const datac=await dbService.addMessage(req.user.id,"AI",airesponse)

        res.json({dataUser:datau,
            dataAI:datac
        });

    }catch(err){
        res.status(400).json({error:err.message});
    }
});
app.get('/chat',auth,async(req,res)=>{
    try
    {
        const data=await dbService.getHistory(req.user.id);
        res.json(data)
        
        
    }catch(Err){
        res.status(400).json({
            error:err.message
        })
    }
})
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server is listining on port", PORT)
})