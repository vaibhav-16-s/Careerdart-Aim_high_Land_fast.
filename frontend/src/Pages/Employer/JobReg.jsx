import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployerNavbar from '../../components/navbar/EmployerNavbar';



function JobReg() {


    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [salary, setSalary] = useState("");
    const [status, setStatus] = useState("Active");
    const [companies, setCompanies] = useState([]);

    const [companyId, setCompanyId] = useState("");

    const [message, setMessage] = useState("");

    useEffect(() => {
        getCompanies();
    }, []);

    const getCompanies = async () => {
        try {

            const res = await axios.get(
                "http://localhost:5000/admin"
            );

            setCompanies(res.data.employers);

        }
        catch (err) {

            console.log(err);

        }
    };


    const handleSubmit = async () => {


        try {


            const response = await axios.post(

                "http://localhost:5000/employer/register-job",

                {
                    title,
                    desc,
                    location,
                    companyId,
                    jobType,
                    salary,
                    status
                }

            );



            setTimeout(() => {
                setMessage("");
            }, 3000);



            setTitle("");
            setDesc("");
            setLocation("");
            setSalary("");
            setJobType("");



        }
        catch (error) {


            setMessage(

                error.response?.data?.message ||
                "Something went wrong"

            );


        }


    };




    return (

        <>

            <div className="header">

                <EmployerNavbar />

            </div>



            <div className="body">


                <h3>
                    Register New Job
                </h3>



                <div className="regJob">


                    <p>
                        Title:

                        <input

                            type="text"

                            value={title}

                            onChange={
                                e => setTitle(e.target.value)
                            }

                        />

                    </p>




                    <p>
                        Description:

                        <textarea

                            value={desc}

                            onChange={
                                e => setDesc(e.target.value)
                            }

                        />

                    </p>




                    <p>
                        Location:

                        <input

                            type="text"

                            value={location}

                            onChange={
                                e => setLocation(e.target.value)
                            }

                        />

                    </p>



                    <p>
                        Company:
                        <select
                            value={companyId}
                            onChange={(e) => setCompanyId(e.target.value)}
                        >
                            <option>Select Company</option>

                            {companies.map(company => (
                                <option
                                    key={company._id}
                                    value={company._id}
                                >
                                    {company.Name}
                                </option>
                            ))}
                        </select>
                    </p>




                    <p>
                        Job Type:


                        <select

                            value={jobType}

                            onChange={
                                e => setJobType(e.target.value)
                            }

                        >

                            <option>
                                Select
                            </option>

                            <option>
                                Full Time
                            </option>


                            <option>
                                Part Time
                            </option>


                            <option>
                                Intern
                            </option>


                        </select>

                    </p>





                    <p>Salary:</p>

                    <div className="input-group" style={{ maxWidth: "300px" }}>

                        <input
                            type="text"
                            className="form-control text-center"
                            value="Rs."
                            disabled
                            style={{ maxWidth: "70px", backgroundColor: "#f8f9fa" }}
                        />

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Salary"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />

                    </div>



                    <br />
                    <p>

                        Status:


                        <select

                            value={status}

                            onChange={
                                e => setStatus(e.target.value)
                            }

                        >

                            <option>
                                Active
                            </option>

                            <option>
                                Inactive
                            </option>


                        </select>


                    </p>





                    <button
                        onClick={handleSubmit}
                    >

                        Post Job

                    </button>



                    <h4>
                        {message}
                    </h4>


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


    );

}


export default JobReg;