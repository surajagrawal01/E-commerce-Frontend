import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

//icons
import { BsCart3 } from "react-icons/bs";

function NavbarComponent() {

    const navigate = useNavigate()

    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Link to="/" className="link-style"><Navbar.Brand>ShopVista</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="link-style"><Nav.Link>Home</Nav.Link></Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link><button className='btn btn-light' onClick={() => navigate('/cart')}><BsCart3 /> Cart</button></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;