import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageLayout from '../../../components/PageLayout';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import PageHeader from '../../../components/PageHeader';
import EmptyState from '../../../components/EmptyState';
import API from '../../../api/AxiosInstance';
import { getProfilePicUrl } from '../../../utils/profilePic';

function ManageJobSeeker() {
    const [jobseekers, setJobseekers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getJobSeekers();
    }, []);

    const getJobSeekers = async (keyword = "") => {
        try {
            const url = keyword
                ? `/admin/jobseekers/search?keyword=${keyword}`
                : "/admin/jobseekers";
            const res = await API.get(url);
            setJobseekers(res.data.jobseekers);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteJobSeeker = async (id) => {
        if (!window.confirm("Delete this JobSeeker?")) return;
        try {
            await API.delete(`/admin/jobseekers/${id}`);
            getJobSeekers();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <PageLayout navbar={<AdminNavbar />}>
            <div className="page-container">
                <PageHeader
                    eyebrow="Admin"
                    title="Manage Job Seekers"
                    subtitle="Browse and manage registered job seeker accounts."
                />

                <div className="filter-bar mb-section">
                    <input
                        type="text"
                        placeholder="Search by name, email, or skill..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && getJobSeekers(search)}
                    />
                    <Button onClick={() => getJobSeekers(search)}>Search</Button>
                </div>

                {jobseekers.length === 0 ? (
                    <EmptyState icon="👤" title="No job seekers found" text="Try a different search term." />
                ) : (
                    <Row>
                        {jobseekers.map((job) => (
                            <Col lg={4} md={6} key={job._id} className="mb-3">
                                <div className="job-card" style={{ padding: 0, overflow: 'hidden' }}>
                                    <img
                                        src={getProfilePicUrl(job.ProfilePic)}
                                        alt={job.Name}
                                        style={{ width: '100%', height: 160, objectFit: 'cover' }}
                                    />
                                    <div style={{ padding: '1.25rem' }}>
                                        <h3 className="job-card__title">{job.Name}</h3>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--cd-text-secondary)', marginBottom: '1rem' }}>
                                            <p style={{ margin: '0.25rem 0' }}>✉️ {job.Email}</p>
                                            <p style={{ margin: '0.25rem 0' }}>🎓 {job.Qualification}</p>
                                            <p style={{ margin: '0.25rem 0' }}>📞 {job.Contact}</p>
                                            <p style={{ margin: '0.25rem 0' }}>📍 {job.Address}</p>
                                            {job.Skills?.length > 0 && (
                                                <div style={{ marginTop: '0.5rem' }}>
                                                    {job.Skills.slice(0, 4).map((s, i) => (
                                                        <span className="skill-tag" key={i} style={{ fontSize: '0.7rem' }}>{s}</span>
                                                    ))}
                                                </div>
                                            )}
                                            <p style={{ margin: '0.5rem 0 0', fontWeight: 600 }}>📨 {job.applicationCount || 0} applications</p>
                                        </div>
                                        <Button variant="danger" size="sm" onClick={() => deleteJobSeeker(job._id)}>Delete</Button>
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

export default ManageJobSeeker;
