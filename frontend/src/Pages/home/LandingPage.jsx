import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PageLayout from '../../components/PageLayout';
import HomeNavbar from '../../components/navbar/HomeNavbar';
import EmptyState from '../../components/EmptyState';
import StatusBadge from '../../components/StatusBadge';
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

    const displayedJobs = showAll ? jobs : jobs.slice(0, 6);

    return (
        <PageLayout navbar={<HomeNavbar />} showContact={true} showFooter={true} flush>
            <section className="hero" id="home">
                <div className="hero__content">
                    <span className="hero__badge">🚀 Your career journey starts here</span>
                    <h1 className="hero__title">Find Your Dream Job With CareerDart</h1>
                    <p className="hero__subtitle">
                        Discover thousands of opportunities, connect with top employers,
                        and take the next step toward the career you deserve.
                    </p>
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Job title, skills, or company..."
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                        />
                        <button className="btn-cd-primary" onClick={handleFindJobs}>
                            Find Jobs
                        </button>
                    </div>
                    <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-cd-ghost" onClick={() => navigate('/home/get_started')}>
                            Get Started Free
                        </button>
                        <button className="btn-cd-ghost" onClick={() => navigate('/home/login')}>
                            Sign In
                        </button>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="page-container">
                    <div className="section__header">
                        <h2 className="section__title">Latest Openings</h2>
                        <p className="section__subtitle">
                            {jobs.length} active job{jobs.length !== 1 ? 's' : ''} waiting for talented professionals like you
                        </p>
                    </div>

                    {displayedJobs.length === 0 ? (
                        <EmptyState
                            icon="💼"
                            title="No jobs available yet"
                            text="Check back soon — new opportunities are posted regularly."
                        />
                    ) : (
                        <div className="jobs-grid">
                            {displayedJobs.map((job) => (
                                <div className="job-card" key={job._id}>
                                    <p className="job-card__company">
                                        {job.CompanyId?.Name || "Company"}
                                    </p>
                                    <h3 className="job-card__title">{job.Title}</h3>
                                    <div className="job-card__meta">
                                        <StatusBadge status={job.JobType} />
                                        <span className="text-secondary-cd">📍 {job.Location}</span>
                                    </div>
                                    <p className="job-card__desc">
                                        {job.Desc?.substring(0, 140)}{job.Desc?.length > 140 ? '...' : ''}
                                    </p>
                                    <div className="job-card__footer">
                                        <span className="job-card__salary">₹ {job.Salary?.toLocaleString()}</span>
                                        <Button
                                            size="sm"
                                            onClick={() => navigate('/home/get_started')}
                                        >
                                            Apply Now
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {jobs.length > 6 && !showAll && (
                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <Button variant="outline-primary" onClick={() => setShowAll(true)}>
                                View all {jobs.length} jobs
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            <section className="section section--alt" id="whyus">
                <div className="page-container">
                    <div className="section__header">
                        <h2 className="section__title">Why Choose CareerDart?</h2>
                        <p className="section__subtitle">
                            We connect talent with opportunity — simply, quickly, and effectively.
                        </p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-card__icon">🔍</div>
                            <h3 className="feature-card__title">Smart Job Search</h3>
                            <p className="feature-card__text">
                                Filter by title, location, and job type to find roles that match your skills and goals.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-card__icon">⚡</div>
                            <h3 className="feature-card__title">One-Click Apply</h3>
                            <p className="feature-card__text">
                                Upload your resume and apply to multiple jobs in seconds — no repetitive forms.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-card__icon">📊</div>
                            <h3 className="feature-card__title">Track Applications</h3>
                            <p className="feature-card__text">
                                Monitor every application status — pending, accepted, or rejected — from your dashboard.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-card__icon">🏢</div>
                            <h3 className="feature-card__title">Trusted Employers</h3>
                            <p className="feature-card__text">
                                All employers are verified by our admin team before they can post jobs on the platform.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" id="about">
                <div className="page-container" style={{ maxWidth: '720px', textAlign: 'center' }}>
                    <h2 className="section__title">About CareerDart</h2>
                    <p className="section__subtitle" style={{ marginBottom: '1.5rem' }}>
                        CareerDart is a modern job portal designed to bridge the gap between job seekers
                        and employers. Whether you're launching your career or hiring your next star employee,
                        CareerDart makes the process seamless.
                    </p>
                    <Button onClick={() => navigate('/home/get_started')}>
                        Join CareerDart Today
                    </Button>
                </div>
            </section>
        </PageLayout>
    );
}

export default LandingPage;
