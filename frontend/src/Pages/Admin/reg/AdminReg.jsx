import React, { useState } from 'react'
import axios from 'axios';
import AdminNavbar from '../../../components/navbar/AdminNavbar'

function AdminReg() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [res, setRes] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [password, setPassword] = useState("");


    const handleReg = async () => {
        try{
        if (password !== conPassword) {
            setRes("Passwords do not match");
            return;
        }
        const response = await axios.post('http://localhost:5000/admin/admin_register', { name, address, email, contact, password });

        if (response.data) {
            console.log("registered admin: ", response.data);
            setRes(response.data.message);
            setTimeout(() => {
                setRes("");
            }, 3000);
            setAddress("");
            setName("");
            setAddress("");
            setEmail("");
            setContact("");
            setPassword("");
            setConPassword("");
        }
        }
        catch(e){
            setRes(response.data.message);
            setTimeout(() => {
                setRes("");
            }, 3000);
        }
    }

    return (
        <>
            <div className='header'><AdminNavbar /></div>

            <div className='body'><h3>Admin Register</h3>
                <div className='regadmin'>
                    <p>Name:<input type='text' value={name} onChange={(e) => setName(e.target.value)} /></p>
                    <p>Email:<input type='text' value={email} onChange={(e) => setEmail(e.target.value)} /></p>
                    <p>Contact:<input type='text' value={contact} onChange={(e) => setContact(e.target.value)} /></p>
                    <p>Address:<input type='text' value={address} onChange={(e) => setAddress(e.target.value)} /></p>
                    <p>Password:<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} /></p>
                    <p>Confirm:<input type='password' value={conPassword} onChange={(e) => setConPassword(e.target.value)} /></p>
                    <p><button onClick={handleReg}>Register</button></p>
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

export default AdminReg;