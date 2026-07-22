import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import EmployerNavbar from '../../components/navbar/EmployerNavbar';
import PageHeader from '../../components/PageHeader';
import API from '../../api/AxiosInstance';

function JobReg() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [salary, setSalary] = useState("");
    const [status, setStatus] = useState("Active");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (!title || !desc || !location || !jobType || !salary) {
            setMessage("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const response = await API.post("/employer/register-job", {
                title, desc, location, jobType, salary, status
            });
            setMessage(response.data.message);
            setTimeout(() => setMessage(""), 3000);
            setTitle(""); setDesc(""); setLocation(""); setSalary(""); setJobType("");
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout navbar={<EmployerNavbar />}>
            <div className="page-container">
                <PageHeader
                    eyebrow="Post a Job"
                    title="Create New Listing"
                    subtitle="Fill in the details below to publish a new job opportunity."
                />

                <form className="form-section" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Job Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Senior Frontend Developer" required />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe the role, responsibilities, and requirements..." required />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Location</label>
                            <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Mumbai, Remote" required />
                        </div>
                        <div className="form-group">
                            <label>Job Type</label>
                            <select value={jobType} onChange={e => setJobType(e.target.value)} required>
                                <option value="">Select type</option>
                                <option>Full Time</option>
                                <option>Part Time</option>
                                <option>Intern</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Salary (₹)</label>
                            <input type="text" value={salary} onChange={e => setSalary(e.target.value)} placeholder="e.g. 800000" required />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select value={status} onChange={e => setStatus(e.target.value)}>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                    </div>

                    {message && (
                        <div className={`form-message ${message.includes('success') || message.includes('posted') ? 'form-message--success' : 'form-message--error'}`}>
                            {message}
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="submit" className="btn-cd-primary" disabled={loading}>
                            {loading ? 'Posting...' : 'Post Job'}
                        </button>
                        <button type="button" className="btn-cd-outline" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </form>
            </div>
        </PageLayout>
    );
}

export default JobReg;
