import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import API from '../../../api/AxiosInstance';
import ProfileSideCard from '../../../components/ProfileSideCard';
import ContactSection from '../../../components/ContactSection';
import FooterSection from '../../../components/FooterSection';

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    employers: 0,
    jobSeekers: 0,
    jobs: 0
  });

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
    { title: "Total Users", value: stats.totalUsers, description: "All users including employers and job seekers." },
    { title: "Employers", value: stats.employers, description: "Companies providing job opportunities." },
    { title: "Total Job Seekers", value: stats.jobSeekers, description: "Job seekers using CareerDart." },
    { title: "Total Jobs", value: stats.jobs, description: "Currently available active jobs." }
  ];

  return (
    <>
      <div className="header">
        <AdminNavbar />
      </div>

      <div className="body container mt-4">
        <h3>Admin Dashboard</h3>
        <h5>Welcome, {profile?.Name || "Admin"}!</h5>

        <Row>
          <Col lg={9}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Row>
                {cards.map((card, index) => (
                  <Col md={6} xl={3} key={index} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title>{card.title}</Card.Title>
                        <h2>{card.value}</h2>
                        <Card.Text>{card.description}</Card.Text>
                      </Card.Body>
                    </Card>
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

      <ContactSection />
      <FooterSection />
    </>
  );
}

export default AdminDashboard;
