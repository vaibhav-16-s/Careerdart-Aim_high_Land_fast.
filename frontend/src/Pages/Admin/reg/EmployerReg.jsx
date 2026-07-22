import React, { useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import PageHeader from '../../../components/PageHeader';
import API from '../../../api/AxiosInstance';

function EmployerReg() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [res, setRes] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [password, setPassword] = useState("");
    const [web, setWeb] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReg = async (e) => {
        e?.preventDefault();
        if (password !== conPassword) {
            setRes("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const response = await API.post("/admin/employer_register", { name, address, email, contact, password, web });
            setRes(response.data.message);
            setTimeout(() => setRes(""), 3000);
            setName(""); setAddress(""); setEmail(""); setContact(""); setPassword(""); setConPassword(""); setWeb("");
        } catch (e) {
            setRes(e.response?.data?.message || "Registration failed");
            setTimeout(() => setRes(""), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout navbar={<AdminNavbar />}>
            <div className="page-container">
                <PageHeader eyebrow="Admin" title="Register Employer" subtitle="Onboard a new company to the platform." />
                <form className="form-section" onSubmit={handleReg}>
                    <div className="form-row">
                        <div className="form-group"><label>Company Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></div>
                        <div className="form-group"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                    </div>
                    <div className="form-group"><label>Website</label><input type="text" value={web} onChange={(e) => setWeb(e.target.value)} placeholder="https://company.com" /></div>
                    <div className="form-row">
                        <div className="form-group"><label>Contact</label><input type="text" value={contact} onChange={(e) => setContact(e.target.value)} /></div>
                        <div className="form-group"><label>Address</label><input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /></div>
                    </div>
                    <div className="form-row">
                        <div className="form-group"><label>Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
                        <div className="form-group"><label>Confirm Password</label><input type="password" value={conPassword} onChange={(e) => setConPassword(e.target.value)} required /></div>
                    </div>
                    {res && <div className={`form-message ${res.includes('success') || res.includes('registered') ? 'form-message--success' : 'form-message--error'}`}>{res}</div>}
                    <div className="form-actions">
                        <button type="submit" className="btn-cd-primary" disabled={loading}>{loading ? 'Registering...' : 'Register Employer'}</button>
                    </div>
                </form>
            </div>
        </PageLayout>
    );
}

export default EmployerReg;
