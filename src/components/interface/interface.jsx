import { useEffect, useState } from "react";
import { Row, Navbar, Nav, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import StudentServices from "../../services/StudentServices";

const MainPage = ({ data }) => {
    // Ensure that data exists and has an item before accessing it
    const Email = data && data.length > 0 ? data[0].loginEmail : null;
    const [userData, setUserData] = useState({}); // State to hold user data from index 0

    useEffect(() => {
        if (Email) {
            StudentServices.getStudents({ email: Email })
                .then(res => {
                    console.log("--->", res);
                    if (res.data && res.data.length > 0) {
                        setUserData(res.data[0]);  // Set the first item of the array
                    }
                })
                .catch(err => console.error("Error fetching student data:", err));
        }
    }, [Email]);

    return (
        <div>
            <Row>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Col>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/mainPage">Home</Nav.Link>
                            <Nav.Link as={Link} to="/About">About</Nav.Link>
                            <Nav.Link as={Link} to="/Contact">Contact</Nav.Link>
                        </Nav>
                    </Col>
                </Navbar>
            </Row>
            <p>main page</p>
            {/* Example of how to use the fetched data */}
            {userData && (
                <div>
                    <h3>User Information</h3>
                    <p>Email: {userData.email}</p>
                    {/* Display more user information if needed */}
                </div>
            )}
        </div>
    );
};

export default MainPage;
