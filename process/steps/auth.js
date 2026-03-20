import services from '../config.js'

const {DataBase}=services;

export const auth=async(req,res,next)=>{
     const token = req.headers.authorization
     console.log("token",token)
    if(!token){
        return res.status(401).json({error:"not logged in"});
        }
    try{
        const {data,error}=await DataBase.auth.getUser(token);
        console.log(data)
        req.user=data.user;
        next();
    }catch(Err){
        return res.status(401).json({error:"auth failed"})
    }
}