import React,{useState} from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import {useParams,useNavigate} from 'react-router-dom';



function UpdatePassword(){


    const {id}=useParams();

    const navigate=useNavigate();


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


            const response=await axios.put(

                `http://localhost:5000/admin/update-password/${id}`,

                {
                    password
                }

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

            <AdminNavbar/>

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



        <div className="footer">

            © CareerDart

        </div>


        </>


    );

}


export default UpdatePassword;