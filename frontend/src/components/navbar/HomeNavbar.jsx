import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import cd_logo from '../../assets/CD_logo.png'

function HomeNavbar() {
  return (

 <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/"><img src={cd_logo} alt="AstraCare Logo" width="35" height="35" className="me-2" /> Careerdart</Navbar.Brand>

        <Nav className="me-auto">
         <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#whyus">Why Us</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="/home/login">Login</Nav.Link>{/* at the other end of the navbar*/}
         
        </Nav>
      </Container>
    </Navbar>
  );
}

export default HomeNavbar;