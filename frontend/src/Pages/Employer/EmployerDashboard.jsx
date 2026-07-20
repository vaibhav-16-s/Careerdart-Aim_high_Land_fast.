import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployerNavbar from '../../components/navbar/EmployerNavbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import API from '../../api/AxiosInstance';
import ProfileSideCard from '../../components/ProfileSideCard';
import ContactSection from '../../components/ContactSection';
import FooterSection from '../../components/FooterSection';

function EmployerDashboard() {

    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [jobCount, setJobCount] = useState(0);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [jobsRes, appsRes, profileRes] = await Promise.all([
                API.get("/employer/myjobs"),
                API.get("/application/received"),
                API.get("/profile/me")
            ]);

            setJobCount(jobsRes.data.length);
            setApplications(appsRes.data);
            setProfile(profileRes.data.profile);
            localStorage.setItem("name", profileRes.data.profile.Name);
        } catch (err) {
            console.log(err);
        }
    };

    const total = applications.length;
    const accepted = applications.filter(a => a.Status === "Accepted").length;
    const pending = applications.filter(a => a.Status === "Pending").length;
    const rejected = applications.filter(a => a.Status === "Rejected").length;
    const recentApps = applications.slice(0, 10);

    return (
        <>
            <div className='header'><EmployerNavbar /></div>
            <div className='body container mt-4'>
                <h4>Employer Dashboard</h4>
                <h5>Welcome, {profile?.Name || "Employer"}!</h5>

                <Row>
                    <Col lg={9}>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Jobs Released</Card.Title>
                                        <h2>{jobCount}</h2>
                                        <Card.Text>Total jobs posted by you.</Card.Text>
                                        <Button variant="link" onClick={() => navigate("/employer/managejobs")}>
                                            View all jobs
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Total Applications</Card.Title>
                                        <Card.Text>Received: <b>{total}</b></Card.Text>
                                        <Card.Text>Accepted: <b>{accepted}</b></Card.Text>
                                        <Card.Text>Pending: <b>{pending}</b></Card.Text>
                                        <Card.Text>Rejected: <b>{rejected}</b></Card.Text>
                                        <Button variant="link" onClick={() => navigate("/employer/applications")}>
                                            View all applications
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <h5>Recent Applications</h5>
                        {recentApps.length === 0 ? (
                            <p>No applications yet.</p>
                        ) : (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Job Title</th>
                                        <th>Applicant</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentApps.map((app, index) => (
                                        <tr key={app._id}>
                                            <td>{index + 1}</td>
                                            <td>{app.JobId?.Title}</td>
                                            <td>{app.JobSeekerId?.Name}</td>
                                            <td>{app.JobSeekerId?.Email}</td>
                                            <td>{app.Status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                    <Col lg={3}>
                        <ProfileSideCard profile={profile} role="Employer" />
                    </Col>
                </Row>
            </div>

            <ContactSection />
            <FooterSection />
        </>
    );
}

export default EmployerDashboard;
