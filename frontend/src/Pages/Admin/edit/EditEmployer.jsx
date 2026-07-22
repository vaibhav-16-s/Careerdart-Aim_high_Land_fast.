import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '../../../components/PageLayout';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import PageHeader from '../../../components/PageHeader';
import LoadingSpinner from '../../../components/LoadingSpinner';
import API from '../../../api/AxiosInstance';

function EmployerEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [web, setWeb] = useState("");
    const [res, setRes] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getEmployer();
    }, []);

    const getEmployer = async () => {
        try {
            const response = await API.get(`/admin/${id}`);
            const emp = response.data.employer;
            setName(emp.Name);
            setEmail(emp.Email);
            setContact(emp.Contact);
            setAddress(emp.Address);
            setWeb(emp.Website);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e?.preventDefault();
        setSaving(true);
        try {
            const response = await API.put(`/admin/employer/${id}`, { name, email, contact, address, web });
            setRes(response.data.message);
            setTimeout(() => {
                setRes("");
                navigate("/admin/manage_employers");
            }, 2000);
        } catch (error) {
            setRes(error.response?.data?.message || "Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <PageLayout navbar={<AdminNavbar />}>
                <LoadingSpinner text="Loading employer..." />
            </PageLayout>
        );
    }

    return (
        <PageLayout navbar={<AdminNavbar />}>
            <div className="page-container">
                <PageHeader eyebrow="Admin" title="Edit Employer" subtitle="Update employer account details." />
                <form className="form-section" onSubmit={handleUpdate}>
                    <div className="form-group"><label>Company Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></div>
                    <div className="form-group"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                    <div className="form-group"><label>Website</label><input type="text" value={web} onChange={(e) => setWeb(e.target.value)} /></div>
                    <div className="form-row">
                        <div className="form-group"><label>Contact</label><input type="text" value={contact} onChange={(e) => setContact(e.target.value)} /></div>
                        <div className="form-group"><label>Address</label><input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /></div>
                    </div>
                    {res && <div className={`form-message ${res.includes('success') || res.includes('updated') ? 'form-message--success' : 'form-message--error'}`}>{res}</div>}
                    <div className="form-actions">
                        <button type="submit" className="btn-cd-primary" disabled={saving}>{saving ? 'Saving...' : 'Update Employer'}</button>
                        <button type="button" className="btn-cd-outline" onClick={() => navigate("/admin/manage_employers")}>Cancel</button>
                    </div>
                </form>
            </div>
        </PageLayout>
    );
}

export default EmployerEdit;
