import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import JobSeekerNavbar from "../../components/navbar/JobSeekerNavbar";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";
import API from "../../api/AxiosInstance";
import { getResumeUrl } from "../../utils/profilePic";

function MyApplications() {
    const navigate = useNavigate();
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
        <PageLayout navbar={<JobSeekerNavbar />}>
            <div className="page-container">
                <PageHeader
                    eyebrow="My Applications"
                    title="Application History"
                    subtitle="Track the status of every job you've applied to."
                />

                {applications.length === 0 ? (
                    <EmptyState
                        icon="📭"
                        title="No applications yet"
                        text="Start exploring jobs and submit your first application."
                        action={<Button onClick={() => navigate("/jobseeker/jobsearch")}>Search Jobs</Button>}
                    />
                ) : (
                    <div className="jobs-grid">
                        {applications.map((app) => (
                            <div className="job-card" key={app._id}>
                                <p className="job-card__company">{app.EmployerId?.Name}</p>
                                <h3 className="job-card__title">{app.JobId?.Title}</h3>
                                <div className="job-card__meta">
                                    <StatusBadge status={app.Status} />
                                    <span className="text-secondary-cd">{app.JobId?.JobType}</span>
                                    <span className="text-secondary-cd">📍 {app.JobId?.Location}</span>
                                </div>
                                <div className="job-card__footer">
                                    <span className="job-card__salary">₹ {app.JobId?.Salary?.toLocaleString()}</span>
                                    <a
                                        href={getResumeUrl(app.Resume)}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ fontSize: '0.85rem' }}
                                    >
                                        View Resume
                                    </a>
                                </div>
                                {app.Status === "Pending" && (
                                    <p style={{ fontSize: '0.85rem', color: 'var(--cd-text-muted)', marginTop: '0.75rem', marginBottom: 0 }}>
                                        ⏳ Waiting for employer response
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
}

export default MyApplications;
