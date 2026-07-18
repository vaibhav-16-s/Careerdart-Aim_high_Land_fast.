const Job = require("../models/JobModel");



//==================================
// Register Job
//==================================


exports.registerJob = async(req,res)=>{


    try{


        const {

            title,
            desc,
            location,
            companyId,
            jobType,
            salary,
            status

        } = req.body;





        const job = await Job.create({

            Title:title,

            Desc:desc,

            Location:location,

            CompanyId:companyId,

            JobType:jobType,

            Salary:salary,

            Status:status

        });




        res.status(201).json({

            success:true,

            message:"Job Posted Successfully",

            job

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};