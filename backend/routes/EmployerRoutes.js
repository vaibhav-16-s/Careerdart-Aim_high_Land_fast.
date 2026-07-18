const express=require("express");
const router=express.Router();
const employerController=require("../controllers/EmployerController");



// Register Job
router.post( "/register-job", employerController.registerJob);



module.exports=router;