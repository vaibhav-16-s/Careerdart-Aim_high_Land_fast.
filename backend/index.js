const dotenv=require("dotenv");
const express =require("express");
const cors=require ("cors");
const connectDB = require("./config/Db");
const app=express();


const AdminRoutes=require("./routes/AdminRoutes");
const HomeRoutes=require("./routes/HomeRoutes");
const EmployerRoutes=require("./routes/EmployerRoutes");




dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Careerdart");
});

//routes-api
app.use('/admin',AdminRoutes);

app.use('/home',HomeRoutes);

app.use('/Employer',EmployerRoutes);







const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Server connected successfully");
});
