import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import cd_logo from '../../assets/CD_logo.png'

function EmployerNavbar() {
  return (

    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/"><img src={cd_logo} alt="AstraCare Logo" width="35" height="35" className="me-2" /> Careerdart</Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link href="/employer/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/employer/manage_jobs">Manage Jobs</Nav.Link>
          <Nav.Link href="/employer/manage_applications">Applications</Nav.Link>
          <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item href="/admin/updatePassword/:id"> update pass </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">update profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4"> logout </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default EmployerNavbar;