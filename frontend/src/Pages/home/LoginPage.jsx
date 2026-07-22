import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import HomeNavbar from '../../components/navbar/HomeNavbar';
import cd_logo from '../../assets/CD_logo.png';
import API from '../../api/AxiosInstance';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [res, setRes] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e?.preventDefault();
        setLoading(true);
        setRes("");

        try {
            const response = await API.post("/home/login", { email, password });
            const result = response.data;

            if (result.success) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("role", result.role);
                localStorage.setItem("userId", result.userId);
                localStorage.setItem("name", result.name || "");

                if (result.role === "Admin") {
                    navigate('/admin/dashboard', { replace: true });
                } else if (result.role === "Employer") {
                    navigate('/employer/dashboard', { replace: true });
                } else if (result.role === "JobSeeker") {
                    navigate('/jobseeker/dashboard', { replace: true });
                } else {
                    setRes("Contact administrator for access.");
                }
            } else {
                setRes(result.error);
            }
        } catch (error) {
            console.log("error while login: ", error);
            setRes("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout navbar={<HomeNavbar />}>
            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-card__logo">
                        <img src={cd_logo} alt="CareerDart" />
                    </div>
                    <h1 className="auth-card__title">Welcome back</h1>
                    <p className="auth-card__subtitle">Sign in to your CareerDart account</p>

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                className="cd-input"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="cd-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {res && (
                            <div className="form-message form-message--error">
                                {res}
                            </div>
                        )}

                        <div className="form-actions" style={{ flexDirection: 'column' }}>
                            <button type="submit" className="btn-cd-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </div>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--cd-text-secondary)' }}>
                        New here?{' '}
                        <Link to="/home/get_started">Create a job seeker account</Link>
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}

export default LoginPage;
