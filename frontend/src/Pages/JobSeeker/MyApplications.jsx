import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import API from "../../api/AxiosInstance";
import JobSeekerNavbar from "../../components/navbar/JobSeekerNavbar";
import ContactSection from "../../components/ContactSection";
import FooterSection from "../../components/FooterSection";

function MyApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await API.get("/application/my");
            setApplications(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="header">
                <JobSeekerNavbar />
            </div>

            <div className="body container mt-4">
                <h3>My Applications</h3>

                {applications.length === 0 ? (
                    <p>No applications found</p>
                ) : (
                    applications.map((app) => (
                        <Card className="mb-3" key={app._id}>
                            <Card.Body>
                                <Card.Title>{app.JobId?.Title}</Card.Title>
                                <Card.Text>Location: {app.JobId?.Location}</Card.Text>
                                <Card.Text>Salary: {app.JobId?.Salary}</Card.Text>
                                <Card.Text>Job Type: {app.JobId?.JobType}</Card.Text>
                                <Card.Text>Company: {app.EmployerId?.Name}</Card.Text>
                                <Card.Text>
                                    <a
                                        href={`http://localhost:5000/uploads/resumes/${app.Resume}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        View Resume
                                    </a>
                                </Card.Text>
                                <Card.Text>Status: <b>{app.Status}</b></Card.Text>
                                {app.Status === "Pending" && (
                                    <Card.Text>Waiting for employer response</Card.Text>
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

export default MyApplications;
