import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

export const signup = async(req, res, next) => {
    const {username,email,password} = req.body

    const isvalidUser = await User.findOne({ email })

    if(isvalidUser){
        return next(errorHandler(400, "user already exist"))
    }   

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    try {
        await newUser.save()

        res.status(201).json({
            sucess: true,
            message: "user created successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const signin = async(req, res, next) => {
    const {email, password} = req.body

    try {
        const validUser = await User.findOne({email})

        if(!validUser){
            return next(errorHandler(404, "User not Found"))
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password)

        if(!validPassword){
            return next(errorHandler(404, "Wrong credential"));
        }

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)

        const {password: pass, ...rest} = validUser._doc

        res.cookie("access_token", token, {httpOnly: true}).status(200).json({
            success: true,
            message: "Login Successfull",
            rest,
        })
    } catch (error) {
    next(error)
    }
}

export const signout = async(req, res, next) => {
    try {
        res.clearCookie("access_token")

        res.status(200).json({
            sucess:true,
            message:" User LoggedOut successfully"
        })
    } catch (error) {
        next(error)        
    }
}