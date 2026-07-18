import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ManageJobSeeker() {

    const navigate = useNavigate();

    const [jobseekers, setJobseekers] = useState([]);

    useEffect(() => {
        getJobSeekers();
    }, []);


    const getJobSeekers = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/admin/jobseekers"
            );

            console.log(res.data);

            setJobseekers(res.data.jobseekers);

        }
        catch(err){

            console.log(err);

        }

    };


    const deleteJobSeeker = async(id)=>{

        if(!window.confirm("Delete this JobSeeker?"))
            return;


        try{

            await axios.delete(
                `http://localhost:5000/admin/jobseekers/${id}`
            );


            getJobSeekers();

        }
        catch(err){

            console.log(err);

        }

    };


    return (
        <>

            <div className="header">
                <AdminNavbar/>
            </div>


            <div className="container mt-4">


                <h3 className="mb-4">
                    Manage JobSeekers
                </h3>


                <div className="mb-4">

                    <input
                        type="text"
                        placeholder="Search JobSeeker"
                        className="form-control"
                    />

                </div>



                <div className="row">


                {
                    jobseekers.map((job)=>(
                        

                        <div 
                            className="col-lg-4 col-md-6 mb-4"
                            key={job._id}
                        >


                            <Card className="shadow h-100">


                                <Card.Img
                                    variant="top"
                                    src="https://dummyimage.com/300x180"
                                />



                                <Card.Body>


                                    <Card.Title>
                                        {job.Name}
                                    </Card.Title>



                                    <Card.Text>
                                        <strong>Email:</strong> {job.Email}
                                    </Card.Text>


                                    <Card.Text>
                                        <strong>Bio:</strong> {job.Bio || "No bio added"}
                                    </Card.Text>


                                    <Card.Text>
                                        <strong>Gender:</strong> {job.Gender}
                                    </Card.Text>



                                    <Card.Text>
                                        <strong>DOB:</strong>
                                        {" "}
                                        {
                                            new Date(job.DOB)
                                            .toLocaleDateString()
                                        }
                                    </Card.Text>



                                    <Card.Text>
                                        <strong>Qualification:</strong>
                                        {" "}
                                        {job.Qualification}
                                    </Card.Text>



                                    <Card.Text>
                                        <strong>Skills:</strong>
                                        {" "}
                                        {job.Skills.join(", ")}
                                    </Card.Text>



                                    <Card.Text>
                                        <strong>Contact:</strong>
                                        {" "}
                                        {job.Contact}
                                    </Card.Text>



                                    <Card.Text>
                                        <strong>Address:</strong>
                                        {" "}
                                        {job.Address}
                                    </Card.Text>



                                    <Card.Text>
                                        <strong>Total Applications:</strong>
                                        0
                                    </Card.Text>



                                    <Button
                                        variant="danger"
                                        className="w-100"
                                        onClick={()=>deleteJobSeeker(job._id)}
                                    >
                                        Delete
                                    </Button>


                                </Card.Body>


                            </Card>


                        </div>


                    ))
                }


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



            <div className="footer text-center p-3">

                © CareerDart

            </div>


        </>
    );
}


export default ManageJobSeeker;