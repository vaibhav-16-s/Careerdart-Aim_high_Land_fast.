import React, { useState } from 'react';
import PageLayout from '../../../components/PageLayout';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import PageHeader from '../../../components/PageHeader';
import API from '../../../api/AxiosInstance';

function AdminReg() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [res, setRes] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReg = async (e) => {
        e?.preventDefault();
        if (password !== conPassword) {
            setRes("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const response = await API.post("/admin/admin_register", { name, address, email, contact, password });
            setRes(response.data.message);
            setTimeout(() => setRes(""), 3000);
            setName(""); setAddress(""); setEmail(""); setContact(""); setPassword(""); setConPassword("");
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
                <PageHeader eyebrow="Admin" title="Register Admin" subtitle="Create a new administrator account." />
                <form className="form-section" onSubmit={handleReg}>
                    <div className="form-group"><label>Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></div>
                    <div className="form-group"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                    <div className="form-group"><label>Contact</label><input type="text" value={contact} onChange={(e) => setContact(e.target.value)} /></div>
                    <div className="form-group"><label>Address</label><input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /></div>
                    <div className="form-row">
                        <div className="form-group"><label>Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
                        <div className="form-group"><label>Confirm Password</label><input type="password" value={conPassword} onChange={(e) => setConPassword(e.target.value)} required /></div>
                    </div>
                    {res && <div className={`form-message ${res.includes('success') || res.includes('registered') ? 'form-message--success' : 'form-message--error'}`}>{res}</div>}
                    <div className="form-actions">
                        <button type="submit" className="btn-cd-primary" disabled={loading}>{loading ? 'Registering...' : 'Register Admin'}</button>
                    </div>
                </form>
            </div>
        </PageLayout>
    );
}

export default AdminReg;
