import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import HomeNavbar from '../../components/navbar/HomeNavbar';
import PageHeader from '../../components/PageHeader';
import API from '../../api/AxiosInstance';

function JobSeekerReg() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [res, setRes] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [password, setPassword] = useState("");
    const [DOB, setDOB] = useState("");
    const [gender, setGender] = useState("");
    const [qual, setQual] = useState("");
    const [Bio, setBio] = useState("");
    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState([]);
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleReg = async (e) => {
        e?.preventDefault();
        if (password !== conPassword) {
            setRes("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("address", address);
            formData.append("email", email);
            formData.append("contact", contact);
            formData.append("password", password);
            formData.append("qual", qual);
            formData.append("skills", skills);
            formData.append("DOB", DOB);
            formData.append("Bio", Bio);
            formData.append("gender", gender);
            if (profilePic) formData.append("ProfilePic", profilePic);

            const response = await API.post("/home/jobseeker_register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setRes(response.data.message);
            setTimeout(() => setRes(""), 5000);

            setName(""); setAddress(""); setEmail(""); setContact("");
            setQual(""); setSkills([]); setDOB(""); setGender("");
            setBio(""); setPassword(""); setConPassword(""); setProfilePic(null);
        } catch (e) {
            setRes(e.response?.data?.message || "Registration failed");
            setTimeout(() => setRes(""), 5000);
        } finally {
            setLoading(false);
        }
    };

    const addSkill = () => {
        const trimmedSkill = skill.trim();
        if (trimmedSkill && !skills.includes(trimmedSkill)) {
            setSkills([...skills, trimmedSkill]);
        }
        setSkill("");
    };

    const removeSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    return (
        <PageLayout navbar={<HomeNavbar />}>
            <div className="page-container">
                <PageHeader
                    eyebrow="Join CareerDart"
                    title="Create Your Account"
                    subtitle="Register as a job seeker and start applying to opportunities today."
                />

                <form className="form-section form-section--wide" onSubmit={handleReg}>
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
                            <label>Date of Birth</label>
                            <input type="date" value={DOB} onChange={(e) => setDOB(e.target.value)} />
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
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Qualification</label>
                            <input type="text" value={qual} onChange={(e) => setQual(e.target.value)} placeholder="e.g. B.Tech Computer Science" />
                        </div>
                        <div className="form-group">
                            <label>Contact</label>
                            <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Bio</label>
                        <textarea value={Bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell employers about yourself..." />
                    </div>

                    <div className="form-group">
                        <label>Skills</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input type="text" value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="Add a skill" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())} />
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
                        <label>Profile Picture</label>
                        <input type="file" accept="image/*" onChange={(e) => setProfilePic(e.target.files[0])} />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" value={conPassword} onChange={(e) => setConPassword(e.target.value)} required />
                        </div>
                    </div>

                    {res && (
                        <div className={`form-message ${res.includes('success') || res.includes('registered') ? 'form-message--success' : 'form-message--error'}`}>
                            {res}
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="submit" className="btn-cd-primary" disabled={loading}>
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </div>

                    <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--cd-text-secondary)' }}>
                        Already have an account? <Link to="/home/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </PageLayout>
    );
}

export default JobSeekerReg;
