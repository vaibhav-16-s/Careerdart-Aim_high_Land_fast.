import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cd_logo from '../../assets/CD_logo.png';

function HomeNavbar() {
    return (
        <Navbar expand="lg" className="cd-navbar" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img src={cd_logo} alt="CareerDart Logo" width="35" height="35" />
                    CareerDart
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="home-nav" />
                <Navbar.Collapse id="home-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/#whyus">Why Us</Nav.Link>
                        <Nav.Link href="/#about">About</Nav.Link>
                        <Nav.Link href="/#contact">Contact</Nav.Link>
                        <Nav.Link href="/home/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HomeNavbar;
