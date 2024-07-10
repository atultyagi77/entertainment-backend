import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/apiRoutes.js";
import multer from 'multer';

const app = express();
const upload = multer();

// Use multer middleware to handle form-data
app.use(upload.none());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(apiRoutes);

export { app };
