import React, { useState } from 'react'
import axios from 'axios';
import HomeNavbar from '../../components/navbar/HomeNavbar';

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


    const handleReg = async () => {
        try {
            if (password !== conPassword) {
                setRes("Passwords do not match");
                return;
            }
            const response = await axios.post('http://localhost:5000/home/jobseeker_register', { name, address, email, contact, password, qual, skills, DOB, Bio, gender });

            if (response.data) {
                console.log("registered admin: ", response.data);
                setRes(response.data.message);
                setTimeout(() => {
                    setRes("");
                }, 5000);
                setAddress("");
                setName("");
                setAddress("");
                setEmail("");
                setContact("");
                setQual("");
                setDOB("");
                setGender("");
                setBio("")
                setPassword("");
                setConPassword("");
            }
        }
        catch (e) {
            setRes(response.data.message);
            setTimeout(() => {
                setRes("");
            }, 5000);
        }
    }

    const addSkill = () => {
        const trimmedSkill = skill.trim();

        if (trimmedSkill === "") return;

        // Prevent duplicates
        if (!skills.includes(trimmedSkill)) {
            setSkills([...skills, trimmedSkill]);
        }

        setSkill("");
    };

    const removeSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className='header'><HomeNavbar /></div>

            <div className='body'><h3>Job Seeker Register</h3>
                <h4>Heyo! Seeker!!</h4>
                <div className='regadmin'>
                    <p>Name:<input type='text' value={name} onChange={(e) => setName(e.target.value)} /></p>
                    <p>
                        Gender:
                        <label className="ms-2">
                            <input type="radio" name="gender" value="Male" checked={gender === "Male"}
                                onChange={(e) => setGender(e.target.value)} />
                            Male
                        </label>

                        <label className="ms-3">
                            <input type="radio" name="gender" value="Female" checked={gender === "Female"}
                                onChange={(e) => setGender(e.target.value)} />
                            Female
                        </label>

                        <label className="ms-3">
                            <input type="radio" name="gender" value="Other" checked={gender === "Other"}
                                onChange={(e) => setGender(e.target.value)} />
                            Other
                        </label>
                    </p>
                    <p>DOB:<input type='date' value={DOB} onChange={(e) => setDOB(e.target.value)} /></p>
                    <p>Email:<input type='text' value={email} onChange={(e) => setEmail(e.target.value)} /></p>
                    <p>Qualifications:<input type='text' value={qual} onChange={(e) => setQual(e.target.value)} /></p>
                    <p>
                        Skills:
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                        />
                        <button type="button" onClick={addSkill}>
                            Add
                        </button>
                    </p>

                    <div>
                        {skills.map((item, index) => (
                            <span
                                key={index}
                                style={{
                                    display: "inline-block",
                                    padding: "5px 10px",
                                    margin: "5px",
                                    borderRadius: "15px",
                                    background: "#0d6efd",
                                    color: "white"
                                }}
                            >
                                {item}
                                <button
                                    type="button"
                                    onClick={() => removeSkill(index)}
                                    style={{
                                        marginLeft: "8px",
                                        border: "none",
                                        background: "transparent",
                                        color: "white",
                                        cursor: "pointer"
                                    }}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                    <p>Bio:<input type='text' value={Bio} onChange={(e) => setBio(e.target.value)} /></p>
                    <p>Contact:<input type='text' value={contact} onChange={(e) => setContact(e.target.value)} /></p>
                    <p>Address:<input type='text' value={address} onChange={(e) => setAddress(e.target.value)} /></p>
                    <p>Password:<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} /></p>
                    <p>Confirm:<input type='password' value={conPassword} onChange={(e) => setConPassword(e.target.value)} /></p>
                    <p><button onClick={handleReg}>Register</button></p>
                    <h4>{res}</h4>
                </div>
            </div>
            <div>
                <h2>Contact Us</h2>
                <p>
                    Email: support@careerdart.com
                </p>

                <p>
                    Phone: +1(212)555-0174
                </p>

                <p>
                    Address: CareerDart Headquarters, NewYork
                </p>

            </div>


            <div className="footer">

                <div>© Careerdart</div>
            </div>
        </>
    )
}

export default JobSeekerReg;