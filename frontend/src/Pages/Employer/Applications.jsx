import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import PageLayout from "../../components/PageLayout";
import EmployerNavbar from "../../components/navbar/EmployerNavbar";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";
import API from "../../api/AxiosInstance";
import { getResumeUrl } from "../../utils/profilePic";

function EmployerApplications() {
    const [applications, setApplications] = useState([]);
    const [updating, setUpdating] = useState(null);

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
        setUpdating(id);
        try {
            await API.put(`/application/status/${id}`, { Status: status });
            fetchApplications();
        } catch (error) {
            console.log(error);
        } finally {
            setUpdating(null);
        }
    };

    return (
        <PageLayout navbar={<EmployerNavbar />}>
            <div className="page-container">
                <PageHeader
                    eyebrow="Applications"
                    title="Received Applications"
                    subtitle="Review candidates and update their application status."
                />

                {applications.length === 0 ? (
                    <EmptyState
                        icon="📭"
                        title="No applications yet"
                        text="Applications will appear here when candidates apply to your jobs."
                    />
                ) : (
                    <div className="jobs-grid">
                        {applications.map((app) => (
                            <div className="job-card" key={app._id}>
                                <p className="job-card__company">{app.JobSeekerId?.Name}</p>
                                <h3 className="job-card__title">{app.JobId?.Title}</h3>
                                <div className="job-card__meta">
                                    <StatusBadge status={app.Status} />
                                    <span className="text-secondary-cd">{app.JobId?.JobType}</span>
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--cd-text-secondary)', marginBottom: '1rem' }}>
                                    <p style={{ margin: '0.25rem 0' }}>✉️ {app.JobSeekerId?.Email}</p>
                                    <p style={{ margin: '0.25rem 0' }}>📞 {app.JobSeekerId?.Contact}</p>
                                    <p style={{ margin: '0.25rem 0' }}>📍 {app.JobId?.Location}</p>
                                    <p style={{ margin: '0.25rem 0' }}>💰 ₹ {app.JobId?.Salary?.toLocaleString()}</p>
                                </div>
                                <div className="job-card__footer">
                                    <a
                                        href={getResumeUrl(app.Resume)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-cd-outline"
                                        style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}
                                    >
                                        View Resume
                                    </a>
                                    {app.Status === "Pending" && (
                                        <div className="gap-actions">
                                            <Button
                                                variant="success"
                                                size="sm"
                                                disabled={updating === app._id}
                                                onClick={() => updateStatus(app._id, "Accepted")}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                disabled={updating === app._id}
                                                onClick={() => updateStatus(app._id, "Rejected")}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
}

export default EmployerApplications;
