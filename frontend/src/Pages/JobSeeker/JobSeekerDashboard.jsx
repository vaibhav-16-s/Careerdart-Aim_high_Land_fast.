import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PageLayout from '../../components/PageLayout';
import JobSeekerNavbar from '../../components/navbar/JobSeekerNavbar';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import ProfileSideCard from '../../components/ProfileSideCard';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import API from '../../api/AxiosInstance';

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
        <PageLayout navbar={<JobSeekerNavbar />}>
            <div className="page-container">
                <PageHeader
                    eyebrow="Job Seeker Dashboard"
                    title={`Welcome, ${profile?.Name || "Job Seeker"}!`}
                    subtitle="Track your applications and discover new opportunities."
                />

                <Row>
                    <Col lg={9}>
                        <Row className="mb-4">
                            <Col md={3} className="mb-3">
                                <StatCard icon="📨" label="Applied" value={total} variant="blue" />
                            </Col>
                            <Col md={3} className="mb-3">
                                <StatCard icon="✅" label="Accepted" value={accepted} variant="green" />
                            </Col>
                            <Col md={3} className="mb-3">
                                <StatCard icon="❌" label="Rejected" value={rejected} variant="red" />
                            </Col>
                            <Col md={3} className="mb-3">
                                <StatCard icon="⏳" label="Pending" value={pending} variant="amber" />
                            </Col>
                        </Row>

                        <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>Recent Applications</h5>
                        {recentApps.length === 0 ? (
                            <EmptyState
                                icon="🔍"
                                title="No applications yet"
                                text="Start searching for jobs and apply with your resume."
                                action={<Button onClick={() => navigate("/jobseeker/jobsearch")}>Search Jobs</Button>}
                            />
                        ) : (
                            <div className="cd-table-wrap">
                                <table className="table table-hover mb-0">
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
                                                <td><StatusBadge status={app.Status} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Col>
                    <Col lg={3}>
                        <ProfileSideCard profile={profile} role="Job Seeker" />
                    </Col>
                </Row>
            </div>
        </PageLayout>
    );
}

export default JobSeekerDashboard;
