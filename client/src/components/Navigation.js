import { Nav, Navbar, Container } from 'react-bootstrap';

export default function Navigation() {
    return (
        <Navbar expand="sm" >
            <Container>
                <Navbar.Brand href="/home"><h2>PowerList</h2></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link href="/home"><h3>Home</h3></Nav.Link>
                        <Nav.Link href="/requirements"><h3>Requirements</h3></Nav.Link>
                        <Nav.Link href="/equipment"><h3>Equipment</h3></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}