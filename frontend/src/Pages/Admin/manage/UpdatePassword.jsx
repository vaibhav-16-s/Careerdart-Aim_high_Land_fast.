import React,{useState} from 'react';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import EmployerNavbar from '../../../components/navbar/EmployerNavbar';
import JobSeekerNavbar from '../../../components/navbar/JobSeekerNavbar';
import {useParams,useNavigate} from 'react-router-dom';
import API from '../../../api/AxiosInstance'
import ContactSection from '../../../components/ContactSection';
import FooterSection from '../../../components/FooterSection';



function UpdatePassword(){


    const {id}=useParams();

    const navigate=useNavigate();
    const role = localStorage.getItem("role");


    const [password,setPassword]=useState("");

    const [confirmPassword,setConfirmPassword]=useState("");

    const [message,setMessage]=useState("");





    const handleUpdate=async()=>{


        if(password!==confirmPassword){

            setMessage(
                "Passwords do not match"
            );

            return;

        }




        try{


            const response = await API.put(
                `/admin/update-password/${id}`,
                { password }
            );



            setMessage(
                response.data.message
            );



            setTimeout(()=>{


                navigate(-1);


            },2000);



        }
        catch(error){


            setMessage(

                error.response?.data?.message ||
                "Something went wrong"

            );

        }


    };





    return(

        <>


        <div className="header">

            {role === "Employer" ? <EmployerNavbar /> :
             role === "JobSeeker" ? <JobSeekerNavbar /> :
             <AdminNavbar />}

        </div>



        <div className="body">


            <h3>
                Update Password
            </h3>



            <div className="regEmployer">


                <p>

                    New Password:

                    <input

                    type="password"

                    value={password}

                    onChange={
                        (e)=>setPassword(e.target.value)
                    }

                    />

                </p>




                <p>

                    Confirm Password:

                    <input

                    type="password"

                    value={confirmPassword}

                    onChange={
                        (e)=>setConfirmPassword(e.target.value)
                    }

                    />

                </p>




                <button
                onClick={handleUpdate}
                >

                    Update Password

                </button>




                <h4>

                    {message}

                </h4>



            </div>



        </div>



        <ContactSection />
        <FooterSection />


        </>


    );

}


export default UpdatePassword;