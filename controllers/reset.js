
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import md5 from "md5";
dotenv.config();


const postreset = async (req,res)=>{
    const {id, token} = req.params;
    const {password,confirm_password} = req.body;

    console.log("token",token);
    //Cheching for password is same or not
    if(password!==confirm_password){
        res.send('Password not match');
        return;
    }
    
    //Finding the user with userid
    const user = await User.findById(id);
    try{
        jwt.verify(token,process.env.TOKEN_HEADER_KEY);
        const encryptedPassword = await md5(password);
        user.password = encryptedPassword;
        await user.save();
        res.json({status:"success",message:"Password changed successfully",data:null});
    }catch(error){
        res.json({status:"error",message:error.message,data:null});
    }

}

export default postreset; 