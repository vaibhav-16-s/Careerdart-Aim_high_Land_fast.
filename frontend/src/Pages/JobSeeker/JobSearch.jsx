import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import PageLayout from "../../components/PageLayout";
import JobSeekerNavbar from "../../components/navbar/JobSeekerNavbar";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";
import API from "../../api/AxiosInstance";

function JobSearch() {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobs, setJobs] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState({});
    const [applying, setApplying] = useState(null);

    const handleSearch = async () => {
        try {
            const params = new URLSearchParams();
            if (title) params.append("title", title);
            if (location) params.append("location", location);
            if (jobType) params.append("jobType", jobType);
            const res = await API.get(`/jobseeker/searchjobs?${params.toString()}`);
            setJobs(res.data);
        } catch (error) {
            console.log(error);
            alert("Could not search jobs");
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    const handleApply = async (jobId) => {
        const file = selectedFiles[jobId];
        if (!file) {
            alert("Please select a resume (PDF).");
            return;
        }

        setApplying(jobId);
        try {
            const formData = new FormData();
            formData.append("JobId", jobId);
            formData.append("Resume", file);
            const res = await API.post("/application/apply", formData);
            alert(res.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setApplying(null);
        }
    };

    return (
        <PageLayout navbar={<JobSeekerNavbar />}>
            <div className="page-container">
                <PageHeader
                    eyebrow="Job Search"
                    title="Find Your Next Role"
                    subtitle="Search active listings and apply with your resume in one click."
                />

                <div className="filter-bar mb-section">
                    <input
                        type="text"
                        placeholder="Job title or keyword..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Location..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                        <option value="">All Types</option>
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Intern</option>
                    </select>
                    <Button onClick={handleSearch}>Search</Button>
                </div>

                {jobs.length === 0 ? (
                    <EmptyState
                        icon="🔍"
                        title="No jobs found"
                        text="Try adjusting your search filters or check back later."
                    />
                ) : (
                    <div className="jobs-grid">
                        {jobs.map((job) => (
                            <div className="job-card" key={job._id}>
                                <p className="job-card__company">
                                    {job.CompanyId?.Name || "Company"}
                                </p>
                                <h3 className="job-card__title">{job.Title}</h3>
                                <div className="job-card__meta">
                                    <StatusBadge status={job.JobType} />
                                    <span className="text-secondary-cd">📍 {job.Location}</span>
                                </div>
                                <p className="job-card__desc">{job.Desc}</p>
                                <div className="job-card__footer">
                                    <span className="job-card__salary">₹ {job.Salary?.toLocaleString()}</span>
                                </div>
                                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        style={{ fontSize: '0.85rem' }}
                                        onChange={(e) =>
                                            setSelectedFiles({ ...selectedFiles, [job._id]: e.target.files[0] })
                                        }
                                    />
                                    <Button
                                        variant="success"
                                        size="sm"
                                        disabled={applying === job._id}
                                        onClick={() => handleApply(job._id)}
                                    >
                                        {applying === job._id ? "Applying..." : "Apply Now"}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
}

export default JobSearch;
