import { Router } from "express";
import { User } from "../Schema/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to entertainment app");
});

router.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404).json({ error: "Email and password are required" });
        } else {
            const findUser = await User.findOne({ email });
            if (findUser) {
                const matchPassword = await bcrypt.compare(password, findUser.password);
                if (matchPassword) {
                    const tokenJwt = jwt.sign({ _id: findUser._id }, process.env.SECRET_KEY);
                    findUser.tokens.push({ token: tokenJwt });
                    await findUser.save();
                    res.status(200).json({
                        "Response": "User login Successfully ...",
                        "token": tokenJwt,
                        "name": findUser.name,
                        "email": findUser.email
                    });
                } else {
                    return res.status(401).json({ error: "Invalid password" });
                }
            } else {
                res.status(404).json({ error: "User not found" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(422).json({ error: "User exists" });
        } else {
            const user = new User({ name, email, password });
            const newUserSave = await user.save();
            if (newUserSave) {
                return res.status(201).json({ "Message": "User Created Successfully" });
            } else {
                return res.status(500).json({ error: "Failed to save user" });
            }
        }
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: "Server error" });
    }
});

router.post("/api/logout", async (req, res) => {
    try {
        const { token, email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ error: "User not found or already logged out" });
        }
        user.tokens = user.tokens.filter((tok) => tok.token !== token);
        await user.save();
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
