import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageLayout from "../../components/PageLayout";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import EmployerNavbar from "../../components/navbar/EmployerNavbar";
import JobSeekerNavbar from "../../components/navbar/JobSeekerNavbar";
import PageHeader from "../../components/PageHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import API from "../../api/AxiosInstance";
import { getProfilePicUrl } from "../../utils/profilePic";

function UpdateProfile() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState("");

    const [web, setWeb] = useState("");
    const [DOB, setDOB] = useState("");
    const [gender, setGender] = useState("");
    const [qual, setQual] = useState("");
    const [Bio, setBio] = useState("");
    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await API.get("/profile/me");
            const p = res.data.profile;
            setName(p.Name || "");
            setEmail(p.Email || "");
            setContact(p.Contact || "");
            setAddress(p.Address || "");
            setPreview(getProfilePicUrl(p.ProfilePic));
            if (role === "Employer") setWeb(p.Website || "");
            if (role === "JobSeeker") {
                setQual(p.Qualification || "");
                setBio(p.Bio || "");
                setGender(p.Gender || "");
                setSkills(p.Skills || []);
                if (p.DOB) setDOB(new Date(p.DOB).toISOString().split("T")[0]);
            }
        } catch (err) {
            setMessage("Could not load profile");
        } finally {
            setLoading(false);
        }
    };

    const handlePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const addSkill = () => {
        const trimmed = skill.trim();
        if (trimmed && !skills.includes(trimmed)) setSkills([...skills, trimmed]);
        setSkill("");
    };

    const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

    const handleUpdate = async (e) => {
        e?.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("contact", contact);
            formData.append("address", address);
            if (role === "Employer") formData.append("web", web);
            if (role === "JobSeeker") {
                formData.append("DOB", DOB);
                formData.append("gender", gender);
                formData.append("qual", qual);
                formData.append("Bio", Bio);
                formData.append("skills", skills.join(","));
            }
            if (profilePic) formData.append("ProfilePic", profilePic);

            const res = await API.put("/profile/me", formData);
            setMessage(res.data.message);
            localStorage.setItem("name", res.data.profile.Name);
            if (res.data.profile.ProfilePic) setPreview(getProfilePicUrl(res.data.profile.ProfilePic));
            setProfilePic(null);
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            setMessage(err.response?.data?.message || "Update failed");
        } finally {
            setSaving(false);
        }
    };

    const Navbar = role === "Employer" ? EmployerNavbar : role === "JobSeeker" ? JobSeekerNavbar : AdminNavbar;

    if (loading) {
        return (
            <PageLayout navbar={<Navbar />}>
                <LoadingSpinner text="Loading profile..." />
            </PageLayout>
        );
    }

    return (
        <PageLayout navbar={<Navbar />}>
            <div className="page-container">
                <PageHeader
                    eyebrow="Account Settings"
                    title="Update Profile"
                    subtitle="Keep your information up to date so employers can find you."
                />

                <form className="form-section form-section--wide" onSubmit={handleUpdate}>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <img
                            src={preview}
                            alt="Profile"
                            style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--cd-border)', marginBottom: '0.75rem' }}
                        />
                        <div className="form-group" style={{ maxWidth: 320, margin: '0 auto' }}>
                            <label>Profile Picture</label>
                            <input type="file" accept="image/*" onChange={handlePicChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Contact</label>
                            <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>

                    {role === "Employer" && (
                        <div className="form-group">
                            <label>Website</label>
                            <input type="text" value={web} onChange={(e) => setWeb(e.target.value)} placeholder="https://yourcompany.com" />
                        </div>
                    )}

                    {role === "JobSeeker" && (
                        <>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Date of Birth</label>
                                    <input type="date" value={DOB} onChange={(e) => setDOB(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Qualification</label>
                                    <input type="text" value={qual} onChange={(e) => setQual(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem' }}>
                                    {["Male", "Female", "Other"].map((g) => (
                                        <label key={g} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 500, cursor: 'pointer' }}>
                                            <input type="radio" name="gender" value={g} checked={gender === g} onChange={(e) => setGender(e.target.value)} />
                                            {g}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Skills</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input type="text" value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="Add a skill" />
                                    <button type="button" className="btn-cd-outline" onClick={addSkill}>Add</button>
                                </div>
                                {skills.length > 0 && (
                                    <div style={{ marginTop: '0.75rem' }}>
                                        {skills.map((item, index) => (
                                            <span className="skill-tag" key={index}>
                                                {item}
                                                <button type="button" onClick={() => removeSkill(index)}>×</button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Bio</label>
                                <textarea value={Bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell employers about yourself..." />
                            </div>
                        </>
                    )}

                    {message && (
                        <div className={`form-message ${message.includes('success') || message.includes('updated') ? 'form-message--success' : 'form-message--error'}`}>
                            {message}
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="submit" className="btn-cd-primary" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Profile'}
                        </button>
                        <button type="button" className="btn-cd-outline" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </form>
            </div>
        </PageLayout>
    );
}

export default UpdateProfile;
