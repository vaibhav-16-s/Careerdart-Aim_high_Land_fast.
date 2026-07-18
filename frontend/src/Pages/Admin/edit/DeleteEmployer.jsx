import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import { useParams, useNavigate } from 'react-router-dom';


function EmployerDelete() {


    const { id } = useParams();

    const navigate = useNavigate();


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [web, setWeb] = useState("");

    const [res, setRes] = useState("");



    // Fetch Employer Details

    useEffect(() => {

        getEmployer();

    }, []);



    const getEmployer = async () => {

        try {

            const response = await axios.get(
                `http://localhost:5000/admin/${id}`
            );


            const emp = response.data.employer;


            setName(emp.Name);
            setEmail(emp.Email);
            setContact(emp.Contact);
            setAddress(emp.Address);
            setWeb(emp.Website);


        }
        catch (error) {

            console.log(error);

        }

    };




    // Update Employer

    const handleUpdate = async () => {


        try {


            const response = await axios.put(

                `http://localhost:5000/admin/employer/${id}`,

                {
                    name,
                    email,
                    contact,
                    address,
                    web
                }

            );



            setRes(response.data.message);



            setTimeout(() => {

                setRes("");

                navigate("/admin/manage_employer");

            }, 2000);



        }
        catch (error) {


            setRes(

                error.response?.data?.message ||
                "Something went wrong"

            );


        }


    };



    return (

        <>


            <div className='header'>

                <AdminNavbar />

            </div>




            <div className='body'>


                <h3>
                    Edit Employer
                </h3>



                <div className='regEmployer'>


                    <p>
                        Name:
                        <input

                            type="text"

                            value={name}

                            onChange={(e) => setName(e.target.value)}

                        />
                    </p>



                    <p>
                        Email:
                        <input

                            type="email"

                            value={email}

                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </p>




                    <p>
                        Website:
                        <input

                            type="text"

                            value={web}

                            onChange={(e) => setWeb(e.target.value)}

                        />
                    </p>




                    <p>
                        Contact:
                        <input

                            type="text"

                            value={contact}

                            onChange={(e) => setContact(e.target.value)}

                        />
                    </p>




                    <p>
                        Address:
                        <input

                            type="text"

                            value={address}

                            onChange={(e) => setAddress(e.target.value)}

                        />
                    </p>



                    <button
                        onClick={handleUpdate}
                    >

                        Update Employer

                    </button>



                    <h4>
                        {res}
                    </h4>



                </div>



            </div>






            <div className="container mt-5">


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
                    Address: CareerDart Headquarters, New York
                </p>


            </div>





            <div className="footer">


                © CareerDart


            </div>



        </>

    );

}


export default EmployerDelete;