import express from "express";
import { authMiddleware } from "./middleware/auth_middleware.js";
const app = express();
app.use(express.json());

app.get("/public", (req, res)=>{
    res.send("This is a public endpoint");
});

app.get("/profile", authMiddleware, (req, res)=>{
    try {
        res.status(200).json({
            name: "Student User",
            role: "Developer"
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/dashboard", authMiddleware, (req, res)=>{
    try {
        res.status(200).json({
            "Dashboard stats": {
                users: 100,
                sales: 50
            }
        });
    } catch (error) {        
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});