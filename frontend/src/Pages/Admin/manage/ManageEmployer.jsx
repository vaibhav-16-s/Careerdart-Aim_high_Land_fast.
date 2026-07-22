import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageLayout from '../../../components/PageLayout';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import PageHeader from '../../../components/PageHeader';
import EmptyState from '../../../components/EmptyState';
import API from '../../../api/AxiosInstance';
import { getProfilePicUrl } from '../../../utils/profilePic';

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
        <PageLayout navbar={<AdminNavbar />}>
            <div className="page-container">
                <PageHeader
                    eyebrow="Admin"
                    title="Manage Employers"
                    subtitle="View, edit, and manage registered employer accounts."
                    actions={
                        <button className="btn-cd-primary" onClick={() => navigate("/admin/employerReg")}>
                            + Register Employer
                        </button>
                    }
                />

                {employers.length === 0 ? (
                    <EmptyState
                        icon="🏢"
                        title="No employers registered"
                        text="Register the first employer to get started."
                        action={<Button onClick={() => navigate("/admin/employerReg")}>Register Employer</Button>}
                    />
                ) : (
                    <Row>
                        {employers.map((emp) => (
                            <Col lg={4} md={6} key={emp._id} className="mb-3">
                                <div className="job-card" style={{ padding: 0, overflow: 'hidden' }}>
                                    <img
                                        src={getProfilePicUrl(emp.ProfilePic)}
                                        alt={emp.Name}
                                        style={{ width: '100%', height: 160, objectFit: 'cover' }}
                                    />
                                    <div style={{ padding: '1.25rem' }}>
                                        <h3 className="job-card__title">{emp.Name}</h3>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--cd-text-secondary)', marginBottom: '1rem' }}>
                                            <p style={{ margin: '0.25rem 0' }}>✉️ {emp.Email}</p>
                                            <p style={{ margin: '0.25rem 0' }}>📞 {emp.Contact}</p>
                                            <p style={{ margin: '0.25rem 0' }}>📍 {emp.Address}</p>
                                            <p style={{ margin: '0.25rem 0' }}>
                                                🌐 {emp.Website ? (
                                                    <a href={emp.Website.startsWith("http") ? emp.Website : `https://${emp.Website}`} target="_blank" rel="noopener noreferrer">
                                                        {emp.Website}
                                                    </a>
                                                ) : "N/A"}
                                            </p>
                                            <p style={{ margin: '0.25rem 0', fontWeight: 600 }}>💼 {emp.jobCount || 0} jobs posted</p>
                                        </div>
                                        <div className="gap-actions">
                                            <Button variant="warning" size="sm" onClick={() => navigate(`/admin/editEmployer/${emp._id}`)}>Edit</Button>
                                            <Button variant="danger" size="sm" onClick={() => deleteEmployer(emp._id)}>Delete</Button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </PageLayout>
    );
}

export default ManageEmployer;
