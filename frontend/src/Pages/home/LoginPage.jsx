import axios from 'axios';
import React, { useState } from 'react';
import HomeNavbar from '../../components/navbar/HomeNavbar';
import { useNavigate } from 'react-router-dom';
import API from '../../api/AxiosInstance'


function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [res, setRes] = useState("");

    const navigate = useNavigate();


    const handleLogin = async () => {

        try {

            const response = await API.post("/home/login", {
                    email,
                    password
                });


            const result = response.data;


            console.log(result);



            if (result.success) {


                // Store JWT token
                localStorage.setItem(
                    "token",
                    result.token
                );


                // Store user role
                localStorage.setItem(
                    "role",
                    result.role
                );

                localStorage.setItem(
                    "userId",
                    result.userId
                );

                localStorage.setItem(
                    "name",
                    result.name || ""
                );



                const userRole = result.role;



                if (userRole === "Admin") {

                    navigate(
                        '/admin/dashboard',
                        {
                            replace: true
                        }
                    );

                } 


                else if (userRole === "Employer") {

                    navigate(
                        '/employer/dashboard',
                        {
                            replace: true
                        }
                    );

                } 


                else if (userRole === "JobSeeker") {

                    navigate(
                        '/jobseeker/dashboard',
                        {
                            replace: true
                        }
                    );

                } 


                else {

                    setRes(
                        "Contact administrator for access."
                    );

                }


            } 
            
            else {

                setRes(result.error);

            }



        } 
        
        catch (error) {

            console.log(
                "error while login: ",
                error
            );


            setRes(
                "Something went wrong"
            );

        }

    };



    return (

        <>

            <div className='header'>
                <HomeNavbar />
            </div>



            <div className='body'>

                <h3>Login</h3>


                <div className='login'>


                    <p>
                        Email:
                        <input
                            type='text'
                            value={email}
                            onChange={
                                (e)=>setEmail(e.target.value)
                            }
                        />
                    </p>



                    <p>
                        Password:
                        <input
                            type='password'
                            value={password}
                            onChange={
                                (e)=>setPassword(e.target.value)
                            }
                        />
                    </p>



                    <p>

                        <button onClick={handleLogin}>
                            Login
                        </button>

                    </p>



                    <h4>
                        {res}
                    </h4>


                </div>


            </div>



            <div>

                <h2>
                    Contact Us
                </h2>


                <p>
                    Email: support@careerdart.com
                </p>


                <p>
                    Phone: +1(212)555-0174
                </p>


                <p>
                    Address: CareerDart Headquarters, NewYork
                </p>


            </div>




            <div className="footer">

                <div>
                    © Careerdart
                </div>

            </div>


        </>

    );
}

export default LoginPage;