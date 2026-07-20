import React, { useEffect, useState } from 'react';
import HomeNavbar from '../../components/navbar/HomeNavbar';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import API from '../../api/AxiosInstance';

function LandingPage() {
    const navigate = useNavigate();
    const [searchTitle, setSearchTitle] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [jobs, setJobs] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const loadJobs = async (title = "", location = "") => {
        try {
            const params = new URLSearchParams();
            if (title) params.append("title", title);
            if (location) params.append("location", location);

            const res = await API.get(`/jobseeker/searchjobs?${params.toString()}`);
            setJobs(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    const handleFindJobs = () => {
        loadJobs(searchTitle, searchLocation);
        setShowAll(false);
    };

    const displayedJobs = showAll ? jobs : jobs.slice(0, 3);

    return (
        <>
            <div className='header'>
                <HomeNavbar />
            </div>

            <div className='body'>
                <h3>Hey! Welcome Aboard!!</h3>
                <p>
                    Your journey to the perfect career starts here. Explore jobs,
                    connect with employers, and take the next step toward success.
                </p>

                <h1>Find Your Dream Job With CareerDart</h1>
                <p>
                    Discover thousands of job opportunities, connect with top employers,
                    and build the career you deserve.
                </p>

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search jobs, skills, or companies..."
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                    />
                    <button onClick={() => navigate('/home/get_started')}>
                        Get Started
                    </button>
                </div>

                <div>
                    <button onClick={handleFindJobs}>Find Jobs</button>
                    <p>
                        (If you want to seek employees for your company,
                        please contact the Admin for registration.)
                    </p>
                </div>

                <div>
                    <h5>Available Jobs ({jobs.length})</h5>
                    {displayedJobs.length === 0 ? (
                        <p>No active jobs right now. Check back soon!</p>
                    ) : (
                        displayedJobs.map((job) => (
                            <Card key={job._id} className="mb-3" style={{ width: '22rem' }}>
                                <Card.Body>
                                    <Card.Title>{job.Title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {job.CompanyId?.Name || "Company"} • {job.Location}
                                    </Card.Subtitle>
                                    <Card.Text>{job.Desc?.substring(0, 120)}...</Card.Text>
                                    <Card.Text><b>{job.JobType}</b> • ₹ {job.Salary}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    )}

                    {jobs.length > 3 && !showAll && (
                        <Button onClick={() => setShowAll(true)}>
                            View more ({jobs.length - 3} more)
                        </Button>
                    )}
                </div>
            </div>

            <div id="whyus">
                <h2>Why Choose CareerDart?</h2>
                <p>
                    CareerDart helps job seekers discover the right opportunities and
                    helps employers find skilled talent efficiently.
                </p>
            </div>

            <div id="about">
                <h2>About CareerDart</h2>
                <p>
                    CareerDart is a modern job portal designed to bridge the gap between
                    job seekers and employers.
                </p>
                <h2>Contact Us</h2>
                <p>Email: support@careerdart.com</p>
                <p>Phone: +1(212)555-0174</p>
                <p>Address: CareerDart Headquarters, New York</p>
            </div>

            <div className="footer">
                <div>© CareerDart</div>
            </div>
        </>
    );
}

export default LandingPage;
