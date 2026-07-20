import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import EmployerNavbar from "../../components/navbar/EmployerNavbar";
import JobSeekerNavbar from "../../components/navbar/JobSeekerNavbar";
import API from "../../api/AxiosInstance";
import { getProfilePicUrl } from "../../utils/profilePic";
import { useNavigate } from "react-router-dom";
import ContactSection from "../../components/ContactSection";
import FooterSection from "../../components/FooterSection";

function UpdateProfile() {

    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

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
            console.log(err);
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
        if (trimmed && !skills.includes(trimmed)) {
            setSkills([...skills, trimmed]);
        }
        setSkill("");
    };

    const removeSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const handleUpdate = async () => {
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

            if (res.data.profile.ProfilePic) {
                setPreview(getProfilePicUrl(res.data.profile.ProfilePic));
            }

            setProfilePic(null);
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            setMessage(err.response?.data?.message || "Update failed");
        }
    };

    const Navbar =
        role === "Employer" ? EmployerNavbar :
        role === "JobSeeker" ? JobSeekerNavbar :
        AdminNavbar;

    if (loading) {
        return (
            <>
                <div className="header"><Navbar /></div>
                <div className="body"><p>Loading profile...</p></div>
            </>
        );
    }

    return (
        <>
            <div className="header"><Navbar /></div>

            <div className="body container mt-4">
                <h3>Update Profile</h3>

                <Card>
                    <Card.Body>
                        <img src={preview} alt="Profile" width="150" height="150" />

                        <p>
                            Profile Picture:
                            <input type="file" accept="image/*" onChange={handlePicChange} />
                        </p>

                        <p>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></p>
                        <p>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></p>
                        <p>Contact: <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} /></p>
                        <p>Address: <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /></p>

                        {role === "Employer" && (
                            <p>Website: <input type="text" value={web} onChange={(e) => setWeb(e.target.value)} /></p>
                        )}

                        {role === "JobSeeker" && (
                            <>
                                <p>DOB: <input type="date" value={DOB} onChange={(e) => setDOB(e.target.value)} /></p>
                                <p>
                                    Gender:
                                    <label><input type="radio" name="gender" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} /> Male</label>
                                    <label><input type="radio" name="gender" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} /> Female</label>
                                    <label><input type="radio" name="gender" value="Other" checked={gender === "Other"} onChange={(e) => setGender(e.target.value)} /> Other</label>
                                </p>
                                <p>Qualification: <input type="text" value={qual} onChange={(e) => setQual(e.target.value)} /></p>
                                <p>
                                    Skills:
                                    <input type="text" value={skill} onChange={(e) => setSkill(e.target.value)} />
                                    <button type="button" onClick={addSkill}>Add</button>
                                </p>
                                <div>
                                    {skills.map((item, index) => (
                                        <span key={index}>
                                            {item}
                                            <button type="button" onClick={() => removeSkill(index)}>×</button>
                                            {" "}
                                        </span>
                                    ))}
                                </div>
                                <p>Bio: <input type="text" value={Bio} onChange={(e) => setBio(e.target.value)} /></p>
                            </>
                        )}

                        <Button onClick={handleUpdate}>Save Profile</Button>
                        {" "}
                        <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>

                        {message && <h4>{message}</h4>}
                    </Card.Body>
                </Card>
            </div>

            <ContactSection />
            <FooterSection />
        </>
    );
}

export default UpdateProfile;
