const express =require("express");
const admincontroller=require("../controllers/AdminController");
const router=express.router();

//--------------------post--------------------
router.post('/admin',admincontroller.AdminRegister);


//--------------------get----------------------





//--------------------put----------------------




//-------------------delete----------------------