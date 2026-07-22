import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PageLayout from '../../components/PageLayout';
import EmployerNavbar from '../../components/navbar/EmployerNavbar';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import API from '../../api/AxiosInstance';

function Managejobs() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchLocation, setSearchLocation] = useState("");

    const fetchJobs = async () => {
        try {
            const res = await API.get("/employer/myjobs");
            setJobs(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);
    
    const filteredJobs = jobs.filter((job) => {
        const matchTitle = job.Title.toLowerCase().includes(searchTitle.toLowerCase());
        const matchLocation = job.Location.toLowerCase().includes(searchLocation.toLowerCase());
        return matchTitle && matchLocation;
    });

    const toggleStatus = async (job) => {
        const newStatus = job.Status === "Active" ? "Inactive" : "Active";
        try {
            await API.put(`/employer/jobs/${job._id}`, { status: newStatus });
            fetchJobs();
        } catch (err) {
            alert("Could not update job");
        }
    };

    const deleteJob = async (id) => {
        if (!window.confirm("Delete this job?")) return;
        try {
            await API.delete(`/employer/jobs/${id}`);
            fetchJobs();
        } catch (err) {
            alert("Could not delete job");
        }
    };

    return (
        <PageLayout navbar={<EmployerNavbar />}>
            <div className="page-container">
                <PageHeader
                    eyebrow="Job Management"
                    title="Your Posted Jobs"
                    subtitle="Manage listings, toggle visibility, and track performance."
                    actions={
                        <button className="btn-cd-primary" onClick={() => navigate("/employer/jobreg")}>
                            + Post New Job
                        </button>
                    }
                />

                <div className="filter-bar mb-section">
                    <input
                        type="text"
                        placeholder="Search by job title..."
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Filter by location..."
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                    />
                </div>

                {jobs.length === 0 ? (
                    <EmptyState
                        icon="📋"
                        title="No jobs posted yet"
                        text="Create your first job listing to start receiving applications."
                        action={<Button onClick={() => navigate("/employer/jobreg")}>Post a Job</Button>}
                    />
                ) : filteredJobs.length === 0 ? (
                    <EmptyState icon="🔍" title="No matching jobs" text="Try different search terms." />
                ) : (
                    <div className="jobs-grid">
                        {filteredJobs.map((job) => (
                            <div className="job-card" key={job._id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h3 className="job-card__title">{job.Title}</h3>
                                    <StatusBadge status={job.Status} />
                                </div>
                                <div className="job-card__meta">
                                    <StatusBadge status={job.JobType} />
                                    <span className="text-secondary-cd">📍 {job.Location}</span>
                                </div>
                                <p className="job-card__desc">{job.Desc}</p>
                                <div className="job-card__footer">
                                    <span className="job-card__salary">₹ {job.Salary?.toLocaleString()}</span>
                                    <div className="gap-actions">
                                        <Button
                                            variant={job.Status === "Active" ? "warning" : "success"}
                                            size="sm"
                                            onClick={() => toggleStatus(job)}
                                        >
                                            {job.Status === "Active" ? "Deactivate" : "Activate"}
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => deleteJob(job._id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
}

export default Managejobs;
