import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
async function SerperAI(msg) {
    try{
        const res=await fetch("https://google.serper.dev/search",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "X-API-KEY":process.env.SERPER_API_KEY
            },
            body:JSON.stringify({q:msg})
        })
        const data=await res.json();
        return data;
    }catch(err){
        console.log("Search failed err:",err)
        return null;
    }
}
 SerperAI("what is spaceX  currently working on").then(data=>console.log(data)).catch(err=>console.log(err))
 console.log("KEY:", process.env.SERPER_API_KEY);
