import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '../../../components/PageLayout';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import EmployerNavbar from '../../../components/navbar/EmployerNavbar';
import JobSeekerNavbar from '../../../components/navbar/JobSeekerNavbar';
import PageHeader from '../../../components/PageHeader';
import API from '../../../api/AxiosInstance';

function UpdatePassword() {
    const { id } = useParams();
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e?.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const response = await API.put(`/admin/update-password/${id}`, { password });
            setMessage(response.data.message);
            setTimeout(() => navigate(-1), 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const Navbar = role === "Employer" ? EmployerNavbar : role === "JobSeeker" ? JobSeekerNavbar : AdminNavbar;

    return (
        <PageLayout navbar={<Navbar />}>
            <div className="page-container">
                <PageHeader
                    eyebrow="Security"
                    title="Update Password"
                    subtitle="Choose a strong password to keep your account secure."
                />

                <form className="form-section" onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                        />
                    </div>

                    {message && (
                        <div className={`form-message ${message.includes('success') || message.includes('updated') ? 'form-message--success' : 'form-message--error'}`}>
                            {message}
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="submit" className="btn-cd-primary" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                        <button type="button" className="btn-cd-outline" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </form>
            </div>
        </PageLayout>
    );
}

export default UpdatePassword;
