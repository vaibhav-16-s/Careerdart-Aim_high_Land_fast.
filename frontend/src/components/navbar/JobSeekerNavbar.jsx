import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import cd_logo from '../../assets/CD_logo.png';
import { useNavigate } from 'react-router-dom';

function JobSeekerNavbar() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        navigate("/home/login", { replace: true });
    };

    return (
        <Navbar expand="lg" className="cd-navbar" variant="dark">
            <Container>
                <Navbar.Brand href="/jobseeker/dashboard">
                    <img src={cd_logo} alt="CareerDart Logo" width="35" height="35" />
                    CareerDart
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="jobseeker-nav" />
                <Navbar.Collapse id="jobseeker-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/jobseeker/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/jobseeker/jobsearch">Search Jobs</Nav.Link>
                        <Nav.Link href="/jobseeker/applications">My Applications</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={name || "Account"} id="jobseeker-nav-dropdown" align="end">
                            <NavDropdown.Item href={`/updatePassword/${userId}`}>Update Password</NavDropdown.Item>
                            <NavDropdown.Item href="/updateProfile">Update Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default JobSeekerNavbar;
