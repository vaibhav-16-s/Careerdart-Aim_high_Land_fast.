import React, { useState } from 'react';
import EmployerNavbar from '../../components/navbar/EmployerNavbar';
import API from '../../api/AxiosInstance';
import ContactSection from '../../components/ContactSection';
import FooterSection from '../../components/FooterSection';

function JobReg() {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [salary, setSalary] = useState("");
    const [status, setStatus] = useState("Active");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {

        if (!title || !desc || !location || !jobType || !salary) {
            setMessage("Please fill in all fields");
            return;
        }

        try {
            const response = await API.post("/employer/register-job", {
                title,
                desc,
                location,
                jobType,
                salary,
                status
            });

            setMessage(response.data.message);

            setTimeout(() => {
                setMessage("");
            }, 3000);

            setTitle("");
            setDesc("");
            setLocation("");
            setSalary("");
            setJobType("");

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <>
            <div className="header">
                <EmployerNavbar />
            </div>

            <div className="body">
                <h3>Register New Job</h3>

                <div className="regJob">
                    <p>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </p>

                    <p>
                        Description:
                        <textarea
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                        />
                    </p>

                    <p>
                        Location:
                        <input
                            type="text"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                    </p>

                    <p>
                        Job Type:
                        <select
                            value={jobType}
                            onChange={e => setJobType(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option>Full Time</option>
                            <option>Part Time</option>
                            <option>Intern</option>
                        </select>
                    </p>

                    <p>Salary:</p>
                    <div className="input-group" style={{ maxWidth: "300px" }}>
                        <input
                            type="text"
                            className="form-control text-center"
                            value="Rs."
                            disabled
                            style={{ maxWidth: "70px", backgroundColor: "#f8f9fa" }}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Salary"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>

                    <br />
                    <p>
                        Status:
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </p>

                    <button onClick={handleSubmit}>
                        Post Job
                    </button>

                    <h4>{message}</h4>
                </div>
            </div>

            <ContactSection />
            <FooterSection />
        </>
    );
}

export default JobReg;
