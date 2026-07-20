import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import cd_logo from '../../assets/CD_logo.png';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        navigate("/home/login", { replace: true });
    };

    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img src={cd_logo} alt="Careerdart Logo" width="35" height="35" className="me-2" />
                    Careerdart
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/admin/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/admin/manage_employers">Manage Employers</Nav.Link>
                    <Nav.Link href="/admin/manage_jobseekers">Manage Job Seeker</Nav.Link>
                    <NavDropdown title="Account" id="admin-nav-dropdown">
                        <NavDropdown.Item href={`/updatePassword/${userId}`}>Update Pass</NavDropdown.Item>
                        <NavDropdown.Item href="/updateProfile">Update Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default AdminNavbar;
