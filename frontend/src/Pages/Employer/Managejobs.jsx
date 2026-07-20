import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import EmployerNavbar from '../../components/navbar/EmployerNavbar';
import API from '../../api/AxiosInstance';
import ContactSection from '../../components/ContactSection';
import FooterSection from '../../components/FooterSection';

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
            console.log(err);
            alert("Could not update job");
        }
    };

    const deleteJob = async (id) => {
        if (!window.confirm("Delete this job?")) return;
        try {
            await API.delete(`/employer/jobs/${id}`);
            fetchJobs();
        } catch (err) {
            console.log(err);
            alert("Could not delete job");
        }
    };

    return (
        <>
            <div className='header'>
                <EmployerNavbar />
            </div>

            <div className='body container mt-4'>
                <h4>Jobs Released By You</h4>
                <p>Manage your posted jobs, update details and track applications.</p>

                <input
                    type="text"
                    placeholder="Search by job name"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Search by location"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                />
                <button onClick={() => navigate("/employer/jobreg")}>Register New Job</button>

                <hr />

                {jobs.length === 0 ? (
                    <h5>No Jobs Posted Yet</h5>
                ) : filteredJobs.length === 0 ? (
                    <h5>No jobs match your search</h5>
                ) : (
                    filteredJobs.map((job) => (
                        <Card className="mb-3" key={job._id}>
                            <Card.Body>
                                <Card.Title>{job.Title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {job.JobType} | {job.Location}
                                </Card.Subtitle>
                                <Card.Text>
                                    <b>Description:</b><br />
                                    {job.Desc}
                                </Card.Text>
                                <Card.Text><b>Salary:</b> ₹ {job.Salary}</Card.Text>
                                <Card.Text><b>Status:</b> {job.Status}</Card.Text>
                                <Button variant="warning" onClick={() => toggleStatus(job)}>
                                    {job.Status === "Active" ? "Deactivate" : "Activate"}
                                </Button>
                                {" "}
                                <Button variant="danger" onClick={() => deleteJob(job._id)}>
                                    Delete
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

export default Managejobs;
