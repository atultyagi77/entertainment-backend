import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import express from "express"

const app = express()

//  asynchronous operation to connect to mongoDB atlas
const connectDB = async () => {
    try {
        // get connection string from .env file
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // log message on successful connection
        console.log(`\n MongoDB connected successfully !! DB host : ${connectionInstance.connection.host}`);
    } catch (error) {
        //if connection failed
        console.log("MongoDB connection failed Error: ", error);
        process.exit(1)
    }
}

export default connectDB