import axios from 'axios';
import React, { useState } from 'react'
import HomeNavbar from '../../components/navbar/HomeNavbar';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [res, setRes] = useState("");

    const navigate=useNavigate();
    
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/home/login', { email, password });
            const result=response.data;
            console.log(result.message);
            if (result) {
                setTimeout(() => {
                    setRes("");
                }, 5000);
                if (result.error === null) {
                    setRes("Invalid email and/or password.");
                }
                else if (result.error === "Invalid User") {
                    setRes("Either Email or Password is incorrect")
                }
                else {
                    let ut = result.role;
                    if (ut === "Admin") {
                        navigate('/admin/dashboard', { replace: true });
                    } else if (ut === "Employer") {
                        navigate('/employer/dashboard', { replace: true });
                    } else if (ut === "JobSeeker") {
                        navigate('/jobseeker/dashboard', { replace: true });
                    } 
                    else {
                        setRes("Contact your administrator for access.");
                    }
                }
            }
            } catch (error) {
                console.log("error while login: ", error);
            }
        }
    return (
            <>
                <div className='header'><HomeNavbar /></div>
                <div className='body'><h3>Login</h3>
                    <div className='login'>

                        <p>Email:<input type='text' value={email} onChange={(e) => setEmail(e.target.value)} /></p>
                        <p>Password:<input type='text' value={password} onChange={(e) => setPassword(e.target.value)} /></p>
                        <p><button onClick={handleLogin}>Login</button></p>
                        <h4>{res}</h4>
                    </div>
                </div>
                <div>
                    <h2>Contact Us</h2>
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

                    <div>© Careerdart</div>
                </div>

            </>
        )
    }

    export default LoginPage