const Admin=require("../models/AdminModel");
const User=require("../models/UserModel");
const bcrypt=require("bcrypt.js");


exports.AdminRegister=async(req,res)=>{
    try{
        const adminData = await Admin.create({
            Name=req.body.name,
            Email=req.body.email,
            Contact=req.body.contact,
            Address=req.body.address
        });

        
        res.status(201).json({
            message:"User registered",
            user
        });
    }catch(error){
        res.status(500).json(error);
    }
};