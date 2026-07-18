const express =require("express");
const HomeController=require("../controllers/HomeController");
const router=express.Router();

//-------------post----------
router.post('/login',HomeController.loginUser);
router.post('/jobseeker_register',HomeController.JobSeekerReg);









module.exports=router;