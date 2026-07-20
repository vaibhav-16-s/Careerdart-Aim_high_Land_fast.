import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import API from '../../../api/AxiosInstance';
import { getProfilePicUrl } from '../../../utils/profilePic';
import ContactSection from '../../../components/ContactSection';
import FooterSection from '../../../components/FooterSection';

function ManageEmployer() {

    const navigate = useNavigate();
    const [employers, setEmployers] = useState([]);

    useEffect(() => {
        getEmployers();
    }, []);

    const getEmployers = async () => {
        try {
            const res = await API.get("/admin");
            setEmployers(res.data.employers);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteEmployer = async (id) => {
        if (!window.confirm("Delete this employer?")) return;

        try {
            await API.delete(`/admin/employer/${id}`);
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

            <div className="body container mt-4">
                <h3>Manage Employers</h3>
                <Button onClick={() => navigate("/admin/employerReg")}>Register Employer</Button>

                <Row className="mt-3">
                    {employers.map((emp) => (
                        <Col lg={4} md={6} key={emp._id} className="mb-3">
                            <Card>
                                <Card.Img variant="top" src={getProfilePicUrl(emp.ProfilePic)} />
                                <Card.Body>
                                    <Card.Title>{emp.Name}</Card.Title>
                                    <Card.Text><strong>Email:</strong> {emp.Email}</Card.Text>
                                    <Card.Text>
                                        <strong>Website:</strong>{" "}
                                        {emp.Website ? (
                                            <a
                                                href={emp.Website.startsWith("http") ? emp.Website : `https://${emp.Website}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {emp.Website}
                                            </a>
                                        ) : "N/A"}
                                    </Card.Text>
                                    <Card.Text><strong>Contact:</strong> {emp.Contact}</Card.Text>
                                    <Card.Text><strong>Address:</strong> {emp.Address}</Card.Text>
                                    <Card.Text><strong>Total Jobs:</strong> {emp.jobCount || 0}</Card.Text>
                                    <Button variant="warning" onClick={() => navigate(`/admin/editEmployer/${emp._id}`)}>
                                        Edit
                                    </Button>
                                    {" "}
                                    <Button variant="danger" onClick={() => deleteEmployer(emp._id)}>
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <ContactSection />
            <FooterSection />
        </>
    );
}

export default ManageEmployer;
