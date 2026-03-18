import dotenv from 'dotenv';
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
dotenv.config();
const geminiAI=new GoogleGenAI(process.env.GEMINI_API_KEY);
const DataBase=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY)

export default {geminiAI,DataBase};
