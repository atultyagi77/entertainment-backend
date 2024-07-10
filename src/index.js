import dotenv from "dotenv"

import connectDB from "./ConnectToDatabase/index.js";
import {app} from './app.js'
dotenv.config({
    path: './.env'
})

// connect to database
connectDB()
.then(() => {
    // get port from .env file or default port and server listening
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    //unable to connect
    console.log("MONGO db connection failed !!! ", err);
})