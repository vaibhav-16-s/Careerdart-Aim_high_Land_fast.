const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const JobSeeker=require("../models/JobSeekerModel");


exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ Email: email });

        if (!user) {
            return res.json({
                success: false,
                error: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.Password);

        if (!isMatch) {
            return res.json({
                success: false,
                error: "Invalid credentials"
            });
        }

        return res.json({
            success: true,
            message: "Login successful",
            role: user.Role
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: "Server Error"
        });

    }

};


exports.JobSeekerReg = async (req, res) => {
    try {
        const { name, email, contact, address, password, qual, skills, DOB, Bio, gender } = req.body;


        const existingUser = await User.findOne({ Email: email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Create Job Seeker
        const jobSeeker = await JobSeeker.create(
            {
                Name: name, Email: email, Contact: contact, Address: address, DOB,
                Gender: gender, Qualification: qual, Skills: skills, Bio, Role: "JobSeeker"
            }
        );
        // Hash password
        const hashPass = await bcrypt.hash(password, 10);

        // Create login credentials
        await User.create({
            Email: email,
            Password: hashPass,
            UserId: jobSeeker._id,
            Role: "JobSeeker"
        });

        return res.status(201).json({
            success: true,
            message: "Job Seeker Registered Successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Registration Failed",
            error: error.message
        });
    }
};