import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import cd_logo from '../../assets/CD_logo.png';
import { useNavigate } from 'react-router-dom';

function EmployerNavbar() {
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
                <Navbar.Brand href="/employer/dashboard">
                    <img src={cd_logo} alt="CareerDart Logo" width="35" height="35" />
                    CareerDart
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="employer-nav" />
                <Navbar.Collapse id="employer-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/employer/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/employer/managejobs">Manage Jobs</Nav.Link>
                        <Nav.Link href="/employer/applications">Applications</Nav.Link>
                        <Nav.Link href="/employer/jobreg">Post Job</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={name || "Account"} id="employer-nav-dropdown" align="end">
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

export default EmployerNavbar;
