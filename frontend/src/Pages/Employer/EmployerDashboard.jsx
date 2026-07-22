import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PageLayout from '../../components/PageLayout';
import EmployerNavbar from '../../components/navbar/EmployerNavbar';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import ProfileSideCard from '../../components/ProfileSideCard';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import API from '../../api/AxiosInstance';

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
        <PageLayout navbar={<EmployerNavbar />}>
            <div className="page-container">
                <PageHeader
                    eyebrow="Employer Dashboard"
                    title={`Welcome, ${profile?.Name || "Employer"}!`}
                    subtitle="Manage your job postings and review incoming applications."
                />

                <Row>
                    <Col lg={9}>
                        <Row className="mb-4">
                            <Col md={6} className="mb-3">
                                <StatCard
                                    icon="📋"
                                    label="Jobs Posted"
                                    value={jobCount}
                                    description="Total jobs you've published."
                                    variant="blue"
                                    action={
                                        <Button variant="link" size="sm" onClick={() => navigate("/employer/managejobs")}>
                                            View all jobs →
                                        </Button>
                                    }
                                />
                            </Col>
                            <Col md={6} className="mb-3">
                                <StatCard
                                    icon="📨"
                                    label="Applications"
                                    value={total}
                                    description={`${accepted} accepted · ${pending} pending · ${rejected} rejected`}
                                    variant="teal"
                                    action={
                                        <Button variant="link" size="sm" onClick={() => navigate("/employer/applications")}>
                                            View all applications →
                                        </Button>
                                    }
                                />
                            </Col>
                        </Row>

                        <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>Recent Applications</h5>
                        {recentApps.length === 0 ? (
                            <EmptyState
                                icon="📭"
                                title="No applications yet"
                                text="Applications will appear here once candidates apply to your jobs."
                                action={<Button onClick={() => navigate("/employer/jobreg")}>Post a Job</Button>}
                            />
                        ) : (
                            <div className="cd-table-wrap">
                                <table className="table table-hover mb-0">
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
                                                <td><StatusBadge status={app.Status} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Col>
                    <Col lg={3}>
                        <ProfileSideCard profile={profile} role="Employer" />
                    </Col>
                </Row>
            </div>
        </PageLayout>
    );
}

export default EmployerDashboard;
