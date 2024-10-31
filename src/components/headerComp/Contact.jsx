import { Link } from "react-router-dom";
import { Row, Navbar, Nav, Col } from "react-bootstrap"
const Contact=()=>{
    return(
        <div>
            <Row>
                <Navbar expand="lg" className="bg-body-tertiary">

                    <Col>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/mainPage">Home</Nav.Link>
                            <Nav.Link as={Link} to="/About">About</Nav.Link>
                            <Nav.Link as={Link} to="/Contact">contact</Nav.Link>
                        </Nav>
                    </Col>
                </Navbar>
            </Row>
            <p>
                contact us 
            </p>
            {/* <button><Link to={"/mainPage"}>back to home page</Link></button> */}
        </div>
    )
}
export default Contact;