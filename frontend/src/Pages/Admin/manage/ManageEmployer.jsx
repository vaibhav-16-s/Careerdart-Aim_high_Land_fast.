import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ManageEmployer() {

    const navigate = useNavigate();

    const [employers, setEmployers] = useState([]);

    useEffect(() => {
        getEmployers();
    }, []);

    const getEmployers = async () => {
        try {

            const res = await axios.get("http://localhost:5000/admin");

            setEmployers(res.data.employers);

        } catch (err) {
            console.log(err);
        }
    };

    const deleteEmployer = async (id) => {

    if (!window.confirm("Delete this employer?"))
        return;

    try {

        await axios.delete(
            `http://localhost:5000/admin/employer/${id}`
        );

        getEmployers();

    } catch (err) {

        console.log(err);

    }

};

    return (
        <>
            <div className="header">
                <AdminNavbar />
            </div>

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h3>Manage Employers</h3>

                    <Button
                        onClick={() => navigate("/admin/employerReg")}
                    >
                        Register Employer
                    </Button>

                </div>

                <div className="row">

                    {employers.map((emp) => (

                        <div
                            className="col-lg-4 col-md-6 mb-4"
                            key={emp._id}
                        >

                            <Card className="shadow h-100">

                                <Card.Img
                                    variant="top"
                                    src="https://via.placeholder.com/300x180"
                                />

                                <Card.Body>

                                    <Card.Title>{emp.Name}</Card.Title>

                                    <Card.Text>
                                        <strong>Email :</strong> {emp.Email}
                                    </Card.Text>

                                    <Card.Text>
                                        <strong>Website :</strong>{" "}
                                        <a
                                            href={
                                                emp.Website.startsWith("http")
                                                    ? emp.Website
                                                    : `https://${emp.Website}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {emp.Website}
                                        </a>
                                    </Card.Text>

                                    <Card.Text>
                                        <strong>Contact :</strong> {emp.Contact}
                                    </Card.Text>

                                    <Card.Text>
                                        <strong>Address :</strong> {emp.Address}
                                    </Card.Text>

                                    <Card.Text>
                                        <strong>Total Jobs :</strong> 0
                                    </Card.Text>

                                    <div className="d-grid gap-2">

                                        <Button
                                            variant="primary"
                                        >
                                            View Applicants
                                        </Button>

                                        <Button
                                            variant="warning"
                                            onClick={() =>
                                                navigate(`/admin/editEmployer/${emp._id}`)
                                            }
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="danger"
                                            onClick={() => deleteEmployer(emp._id)}
                                        >
                                            Delete
                                        </Button>

                                    </div>

                                </Card.Body>

                            </Card>

                        </div>

                    ))}

                </div>

            </div>

            <div className="container mt-5">

                <h2>Contact Us</h2>

                <p>Email : support@careerdart.com</p>

                <p>Phone : +1 (212) 555-0174</p>

                <p>CareerDart Headquarters, New York</p>

            </div>

            <div className="footer text-center p-3">
                © CareerDart
            </div>

        </>
    );
}

export default ManageEmployer;