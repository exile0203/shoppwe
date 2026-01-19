import mongoose from "mongoose";
import { DB_URI } from "./envConfig.js";
const connectDB = async ()=>{
    try{
        const result = await mongoose.connect(DB_URI);
        console.log("Database connected successfully");
    }catch(err){
        console.log("Database connection failed", err);
        exit(1);
    }
}

export default connectDB;