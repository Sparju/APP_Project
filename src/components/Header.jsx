import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <>
            <Header>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Row>
                            <Col>
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/About">About</Nav.Link>
                                    <Nav.Link as={Link} to="/Contact">contact</Nav.Link>
                                </Nav></Col>
                        </Row>
                    </Container>
                </Navbar>
            </Header>
        </>
    )
}
export default Header;