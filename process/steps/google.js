import services from '../config.js';
import SerperAI from './search.js';

const {geminiAI}=services;
export const Aifunction={
    async genReply(message){
         try{
            const data= await SerperAI(message);
 let add=[];
 const datas=data.organic.map(item=>{
    if(item.position<=4){
          add.push(item.snippet)
    }else{
        return;
    }
});
const summery=add.join()
         const response = await geminiAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
User name: ${message}

Relevant search data: ${summery}

you are a help full assitant, you must first greet user and ask them if you can help using the relevent data
        `,
      });
      return response.text;

         }catch(err){
            console.log("Gemini error",err)
            return "somthing went wrong"
         }
    },
}
const test=await Aifunction.genReply("ELon musk")
console.log(test);
