import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import API from '../../../api/AxiosInstance';
import { getProfilePicUrl } from '../../../utils/profilePic';
import ContactSection from '../../../components/ContactSection';
import FooterSection from '../../../components/FooterSection';

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
        <>
            <div className="header">
                <AdminNavbar />
            </div>

            <div className="body container mt-4">
                <h3>Manage JobSeekers</h3>

                <input
                    type="text"
                    placeholder="Search JobSeeker"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={() => getJobSeekers(search)}>Search</button>

                <Row className="mt-3">
                    {jobseekers.map((job) => (
                        <Col lg={4} md={6} key={job._id} className="mb-3">
                            <Card>
                                <Card.Img variant="top" src={getProfilePicUrl(job.ProfilePic)} />
                                <Card.Body>
                                    <Card.Title>{job.Name}</Card.Title>
                                    <Card.Text><strong>Email:</strong> {job.Email}</Card.Text>
                                    <Card.Text><strong>Bio:</strong> {job.Bio || "No bio added"}</Card.Text>
                                    <Card.Text><strong>Gender:</strong> {job.Gender}</Card.Text>
                                    <Card.Text><strong>DOB:</strong> {new Date(job.DOB).toLocaleDateString()}</Card.Text>
                                    <Card.Text><strong>Qualification:</strong> {job.Qualification}</Card.Text>
                                    <Card.Text><strong>Skills:</strong> {job.Skills ? job.Skills.join(", ") : "None"}</Card.Text>
                                    <Card.Text><strong>Contact:</strong> {job.Contact}</Card.Text>
                                    <Card.Text><strong>Address:</strong> {job.Address}</Card.Text>
                                    <Card.Text><strong>Total Applications:</strong> {job.applicationCount || 0}</Card.Text>
                                    <Button variant="danger" onClick={() => deleteJobSeeker(job._id)}>
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <ContactSection />
            <FooterSection />
        </>
    );
}

export default ManageJobSeeker;
