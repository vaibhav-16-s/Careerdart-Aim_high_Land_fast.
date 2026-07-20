import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import API from "../../api/AxiosInstance";
import JobSeekerNavbar from "../../components/navbar/JobSeekerNavbar";
import ContactSection from "../../components/ContactSection";
import FooterSection from "../../components/FooterSection";

function JobSearch() {

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobs, setJobs] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState({});

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
            alert("Please select a resume.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("JobId", jobId);
            formData.append("Resume", file);

            const res = await API.post("/application/apply", formData);
            alert(res.data.message);
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <>
            <div className="header"><JobSeekerNavbar /></div>
            <div className="body container mt-4">
                <h2>Search Jobs</h2>

                <Card className="mb-3">
                    <Card.Body>
                        <p>
                            Job Title:
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </p>
                        <p>
                            Location:
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                        </p>
                        <p>
                            Job Type:
                            <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                                <option value="">All</option>
                                <option>Full Time</option>
                                <option>Part Time</option>
                                <option>Intern</option>
                            </select>
                        </p>
                        <Button onClick={handleSearch}>Search Jobs</Button>
                    </Card.Body>
                </Card>

                <h4>Available Jobs</h4>

                {jobs.length === 0 ? (
                    <p>No jobs found.</p>
                ) : (
                    jobs.map((job) => (
                        <Card className="mb-3" key={job._id}>
                            <Card.Body>
                                <Card.Title>{job.Title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {job.JobType} • {job.Location}
                                    {job.CompanyId?.Name && ` • ${job.CompanyId.Name}`}
                                </Card.Subtitle>
                                <Card.Text>
                                    <strong>Description:</strong><br />
                                    {job.Desc}
                                </Card.Text>
                                <Card.Text><strong>Salary:</strong> ₹ {job.Salary}</Card.Text>
                                <Card.Text><strong>Status:</strong> {job.Status}</Card.Text>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) =>
                                        setSelectedFiles({
                                            ...selectedFiles,
                                            [job._id]: e.target.files[0],
                                        })
                                    }
                                />
                                {" "}
                                <Button variant="success" onClick={() => handleApply(job._id)}>
                                    Apply
                                </Button>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>

            <ContactSection />
            <FooterSection />
        </>
    );
}

export default JobSearch;
