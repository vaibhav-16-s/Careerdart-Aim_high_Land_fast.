import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobSeekerNavbar from '../../components/navbar/JobSeekerNavbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import API from '../../api/AxiosInstance';
import ProfileSideCard from '../../components/ProfileSideCard';
import ContactSection from '../../components/ContactSection';
import FooterSection from '../../components/FooterSection';

function JobSeekerDashboard() {

    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [appsRes, profileRes] = await Promise.all([
                API.get("/application/my"),
                API.get("/profile/me")
            ]);

            setApplications(appsRes.data);
            setProfile(profileRes.data.profile);
            localStorage.setItem("name", profileRes.data.profile.Name);
        } catch (err) {
            console.log(err);
        }
    };

    const total = applications.length;
    const accepted = applications.filter(a => a.Status === "Accepted").length;
    const rejected = applications.filter(a => a.Status === "Rejected").length;
    const pending = applications.filter(a => a.Status === "Pending").length;
    const recentApps = applications.slice(0, 10);

    return (
        <>
            <div className='header'><JobSeekerNavbar /></div>

            <div className='body container mt-4'>
                <h4>Job Seeker Dashboard</h4>
                <h5>Welcome, {profile?.Name || "Job Seeker"}!</h5>

                <Row>
                    <Col lg={9}>
                        <Row className="mb-3">
                            <Col md={3}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Applied</Card.Title>
                                        <h2>{total}</h2>
                                        <Button variant="link" onClick={() => navigate("/jobseeker/applications")}>
                                            View all
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Accepted</Card.Title>
                                        <h2>{accepted}</h2>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Rejected</Card.Title>
                                        <h2>{rejected}</h2>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Pending</Card.Title>
                                        <h2>{pending}</h2>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <h5>Recent Applications</h5>
                        {recentApps.length === 0 ? (
                            <p>No applications yet. <Button variant="link" onClick={() => navigate("/jobseeker/jobsearch")}>Search jobs</Button></p>
                        ) : (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Job Title</th>
                                        <th>Company</th>
                                        <th>Location</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentApps.map((app, index) => (
                                        <tr key={app._id}>
                                            <td>{index + 1}</td>
                                            <td>{app.JobId?.Title}</td>
                                            <td>{app.EmployerId?.Name}</td>
                                            <td>{app.JobId?.Location}</td>
                                            <td>{app.Status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                    <Col lg={3}>
                        <ProfileSideCard profile={profile} role="Job Seeker" />
                    </Col>
                </Row>
            </div>

            <ContactSection />
            <FooterSection />
        </>
    );
}

export default JobSeekerDashboard;
