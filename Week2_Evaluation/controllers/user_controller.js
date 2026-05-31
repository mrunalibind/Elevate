import User from "../models/user_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const userExist = await User.findOne({email});

        if(userExist) {
            throw new Error("User Already Exists");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashPassword
        });
        res.status(200).json({
            success: true,
            message: "User is created"
        });
    } catch (error) {
        console.log(error.message)
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
      
        if(!user){
            throw new Error("Invalid Credentials");
        }

        const passCompare = await bcrypt.compare(
            password,
            user.password
        );
        
        if(!passCompare){
            throw new Error("Invalid Credentials");
        }
        const token = jwt.sign({
            id: user._id,
            role: user.role
        },
        process.env.SECRET_KEY,
        {expiresIn: "7d"});

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token
        })
    } catch (error) {
        console.log(error.message)
    }
}