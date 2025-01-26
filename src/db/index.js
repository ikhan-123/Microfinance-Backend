import mongoose from "mongoose";
import { Db_NAME } from "../constants.js";


const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${Db_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED:", error);
        process.exit(1);
        
    }
}

export default connectDB;