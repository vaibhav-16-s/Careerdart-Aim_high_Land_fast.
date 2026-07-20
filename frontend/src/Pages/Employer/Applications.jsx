import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import API from "../../api/AxiosInstance";
import EmployerNavbar from "../../components/navbar/EmployerNavbar";
import ContactSection from "../../components/ContactSection";
import FooterSection from "../../components/FooterSection";

function EmployerApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await API.get("/application/received");
            setApplications(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/application/status/${id}`, { Status: status });
            fetchApplications();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="header">
                <EmployerNavbar />
            </div>

            <div className="body container mt-4">
                <h3>Applications Received</h3>

                {applications.length === 0 ? (
                    <p>No applications received.</p>
                ) : (
                    applications.map((app) => (
                        <Card className="mb-3" key={app._id}>
                            <Card.Body>
                                <Card.Title>{app.JobId?.Title}</Card.Title>
                                <Card.Text><strong>Applicant:</strong> {app.JobSeekerId?.Name}</Card.Text>
                                <Card.Text><strong>Email:</strong> {app.JobSeekerId?.Email}</Card.Text>
                                <Card.Text><strong>Contact:</strong> {app.JobSeekerId?.Contact}</Card.Text>
                                <Card.Text><strong>Location:</strong> {app.JobId?.Location}</Card.Text>
                                <Card.Text><strong>Job Type:</strong> {app.JobId?.JobType}</Card.Text>
                                <Card.Text><strong>Salary:</strong> ₹ {app.JobId?.Salary}</Card.Text>
                                <Card.Text><strong>Status:</strong> <b>{app.Status}</b></Card.Text>
                                <Card.Text>
                                    <strong>Resume:</strong>{" "}
                                    <a
                                        href={`http://localhost:5000/uploads/resumes/${app.Resume}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        View Resume
                                    </a>
                                </Card.Text>

                                {app.Status === "Pending" && (
                                    <>
                                        <Button variant="success" onClick={() => updateStatus(app._id, "Accepted")}>
                                            Accept
                                        </Button>
                                        {" "}
                                        <Button variant="danger" onClick={() => updateStatus(app._id, "Rejected")}>
                                            Reject
                                        </Button>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>

            <ContactSection />
            <FooterSection />
        </>
    );
}

export default EmployerApplications;
