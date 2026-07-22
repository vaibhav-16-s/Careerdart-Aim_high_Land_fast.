import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageLayout from '../../../components/PageLayout';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import PageHeader from '../../../components/PageHeader';
import StatCard from '../../../components/StatCard';
import ProfileSideCard from '../../../components/ProfileSideCard';
import LoadingSpinner from '../../../components/LoadingSpinner';
import API from '../../../api/AxiosInstance';

function AdminDashboard() {
    const [stats, setStats] = useState({ totalUsers: 0, employers: 0, jobSeekers: 0, jobs: 0 });
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const [statsRes, profileRes] = await Promise.all([
                API.get("/admin/dashboard"),
                API.get("/profile/me")
            ]);
            setStats({
                totalUsers: statsRes.data.totalUsers || 0,
                employers: statsRes.data.employers || 0,
                jobSeekers: statsRes.data.jobSeekers || 0,
                jobs: statsRes.data.jobs || 0
            });
            setProfile(profileRes.data.profile);
            localStorage.setItem("name", profileRes.data.profile.Name);
        } catch (error) {
            console.log("Dashboard Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const cards = [
        { icon: "👥", label: "Total Users", value: stats.totalUsers, description: "All registered users on the platform.", variant: "blue" },
        { icon: "🏢", label: "Employers", value: stats.employers, description: "Companies providing job opportunities.", variant: "teal" },
        { icon: "🎯", label: "Job Seekers", value: stats.jobSeekers, description: "Professionals searching for roles.", variant: "purple" },
        { icon: "💼", label: "Active Jobs", value: stats.jobs, description: "Currently open job listings.", variant: "green" }
    ];

    return (
        <PageLayout navbar={<AdminNavbar />}>
            <div className="page-container">
                <PageHeader
                    eyebrow="Admin Panel"
                    title={`Welcome, ${profile?.Name || "Admin"}!`}
                    subtitle="Overview of platform activity and user statistics."
                />

                <Row>
                    <Col lg={9}>
                        {loading ? (
                            <LoadingSpinner text="Loading dashboard..." />
                        ) : (
                            <Row>
                                {cards.map((card, index) => (
                                    <Col md={6} xl={3} key={index} className="mb-3">
                                        <StatCard {...card} />
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Col>
                    <Col lg={3} className="mb-3">
                        <ProfileSideCard profile={profile} role="Admin" />
                    </Col>
                </Row>
            </div>
        </PageLayout>
    );
}

export default AdminDashboard;
