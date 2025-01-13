import UserModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from "validator"

//login
const LoginUser = async(req,res) =>{
     const {email,password}=req.body;
     try {
        const user = await UserModel.findOne({email})

        if(!user){
          return res.json({success:false, message:"User Does not Exit"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
           return res.json({success:false, message:"Invaild Cerdentials"})
        }

        const token = createToken(user._id);
        res.json({success:true, token})
     } catch (error) {
        console.log(error);
    res.json({success:false, message:"Error Occured"});
     }
}

//create token
const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register
const RegisterUser = async(req,res) =>{
   const {name,password,email}=req.body
   try {
    //checking is user already exit
    const exits = await UserModel.findOne({email});
    if (exits) {
        return res.json({success:false, message:"User Already Exist"})
    } 

    //email and password validating strong password
    if (!validator.isEmail(email)) {
        return res.json({success:false, message:"Enter Valid Email"})
    } 

    //checking password strong
    if (password.length<8) {
        return res.json({success:false, message:"Enter Strong Password"})
    } 

     //hasing user pasword encyrt
     const salt = await bcrypt.genSalt(10);
     const hasedPassword = await bcrypt.hash(password,salt);

     const newUser = new UserModel({
        name:name,
        email:email,
        password:hasedPassword
     })

     const user =await newUser.save();
     const token = createToken(user._id)
     res.json({success:true, token});
   } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error Occured"});
   }
}

export {LoginUser, RegisterUser};