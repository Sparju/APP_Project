// import { useFormik } from "formik";
// import { Button, Container, Col, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
// import *as Yup from "yup";
// import "./StyleSheets/login.css"
// import StudentServices from "../services/StudentServices";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import MainPage from "./interface/interface";
// import Images from "../images/image";
// import Admin from "./Admin";
// import Header from "./Header";


// const Login = () => {
//     const [logdata, setLogdata] = useState([]);
//     const [data1, setData1] = useState([]);
//     const [redirect, setRedirect] = useState(false);
//     const [adminRedirect, setadminRedirect] = useState(false);


//     const validationSchema = Yup.object().shape({
//         loginEmail: Yup.string().required("email is required").email("email is invalid"),
//         loginPassword: Yup.string().required("password is required"),
//     })
//     const formik = useFormik({
//         initialValues: {
//             loginEmail: "",
//             loginPassword: "",

//         },
//         validationSchema,
//         onSubmit: async (data, { resetForm }) => {
//             try {
//                 setLogdata(prevData => [...prevData, data]);
//                 console.log(data);
//                 resetForm();
//                 console.log(logdata);

//                 const user = data1.find(user => user.email === data.loginEmail);
//                 // const admin = (loginEmail === "Admin@gmail.com");
//                 if (data.loginEmail === "Admin@gmail.com" && data.loginPassword === "sparjan") {
//                         alert(" admin Login successful");
//                         setadminRedirect(true)
//                         setRedirect(false)
                        
//                 }
//                 else if (user) {
//                     if (user.password === data.loginPassword) {
//                         alert("Login successful");
//                         adminlogin()
//                         setRedirect(true);
//                         setadminRedirect(false)
                        
//                     } else {
//                         alert("Incorrect password");
//                     }
//                 } else {
//                     alert("User not found");
//                 }
//             } catch (error) {
//                 console.error('Error logging in:', error);
//                 alert('Error logging in');
//             }
//         }

//     })
//     const adminlogin=()=>{

//     }
//     useEffect(() => {
//         StudentServices.getAllStudents().then(res => setData1(res.data)).catch(err => console.log(err))
//     }, [])
//     // useEffect(() => {
//     //     if (redirect) {
//     //         return <Link to={"/mainPage"}/>// Redirect to mainPage if redirect state is true
//     //     }
//     // }, [redirect, history]);
//     // return (
//     //     <Container id="logContainer">
//     //         {!redirect ? (
//     //             <Row>
//     //                 <Col id="c3">
//     //                     <Form onSubmit={formik.handleSubmit}>
//     //                     <FormGroup >
//     //                             <FormLabel htmlFor="email">email : </FormLabel>
//     //                             <FormControl
//     //                                 type="email"
//     //                                 className={"form-control" + formik.errors.loginEmail && formik.touched.loginEmail ? " is-invalid" : ""}
//     //                                 name="loginEmail" id="loginEmail"
//     //                                 onChange={formik.handleChange}
//     //                                 value={formik.values.loginEmail}
//     //                             />
//     //                             <FormGroup className="invalid-feedback">
//     //                                 {formik.errors.loginEmail && formik.touched.loginEmail ? formik.errors.loginEmail : null}
//     //                             </FormGroup>
//     //                         </FormGroup> <br />
//     //                         <FormGroup >
//     //                             <FormLabel htmlFor="password ">password : </FormLabel>
//     //                             <FormControl
//     //                                 type="password"
//     //                                 className={"form-control" + formik.errors.loginPassword && formik.touched.loginPassword ? " is-invalid" : ""}
//     //                                 name="loginPassword" id="loginPassword"
//     //                                 onChange={formik.handleChange}
//     //                                 value={formik.values.loginPassword}
//     //                             />
//     //                             <FormGroup className="invalid-feedback">
//     //                                 {formik.errors.loginPassword && formik.touched.loginPassword ? formik.errors.loginPassword : null}
//     //                             </FormGroup>
//     //                         </FormGroup><br />
//     //                         <Button type="submit" id="subBut" > login</Button>
//     //                         <p id="p2">register your account</p>
//     //                         <Link to={"/"}> <Button id="regbut1">register</Button></Link>
//     //                     </Form>

//     //                 </Col>
//     //                 <Col id="c4">
//     //                     <Images />
//     //                 </Col>
//     //             </Row>
//     //         ) : ( adminRedirect ?(<Header/>) : (
//     //              <MainPage />

//     //         )
//     //         )}
//     //     </Container>

//     // )
//     return (
//         <Container id="logContainer">
//             {!redirect ? (
//                 <Row>
//                     <Col id="c3">
//                         <Form onSubmit={formik.handleSubmit}>
//                             <FormGroup>
//                                 <FormLabel htmlFor="email">email : </FormLabel>
//                                 <FormControl
//                                     type="email"
//                                     className={"form-control" + (formik.errors.loginEmail && formik.touched.loginEmail ? " is-invalid" : "")}
//                                     name="loginEmail" id="loginEmail"
//                                     onChange={formik.handleChange}
//                                     value={formik.values.loginEmail}
//                                 />
//                                 <FormGroup className="invalid-feedback">
//                                     {formik.errors.loginEmail && formik.touched.loginEmail ? formik.errors.loginEmail : null}
//                                 </FormGroup>
//                             </FormGroup> <br />
//                             <FormGroup>
//                                 <FormLabel htmlFor="password">password : </FormLabel>
//                                 <FormControl
//                                     type="password"
//                                     className={"form-control" + (formik.errors.loginPassword && formik.touched.loginPassword ? " is-invalid" : "")}
//                                     name="loginPassword" id="loginPassword"
//                                     onChange={formik.handleChange}
//                                     value={formik.values.loginPassword}
//                                 />
//                                 <FormGroup className="invalid-feedback">
//                                     {formik.errors.loginPassword && formik.touched.loginPassword ? formik.errors.loginPassword : null}
//                                 </FormGroup>
//                             </FormGroup><br />
//                             <Button type="submit" id="subBut"> login</Button>
//                             <p id="p2">register your account</p>
//                             <Link to={"/"}> <Button id="regbut1">register</Button></Link>
//                         </Form>
//                     </Col>
//                     <Col id="c4">
//                         <Images />
//                     </Col>
//                 </Row>
//             ) : ( 
//                 adminRedirect ? <Header /> : <MainPage />
//             )}
//         </Container>
//     );
    
// }
// export default Login;
import { useFormik } from "formik";
import { Button, Container, Col, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import * as Yup from "yup";
import "./StyleSheets/login.css";
import StudentServices from "../services/StudentServices";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import MainPage from "./interface/interface";
import Images from "../images/image";

const Login = () => {
    const [logdata, setLogdata] = useState([]);
    const [data1, setData1] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    const validationSchema = Yup.object().shape({
        loginEmail: Yup.string().required("Email is required").email("Email is invalid"),
        loginPassword: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            loginEmail: "",
            loginPassword: "",
        },
        validationSchema,
        onSubmit: async (data, { resetForm }) => {
            try {
                setLogdata(prevData => [...prevData, data]);
                resetForm();
                const user = data1.find(user => user.email === data.loginEmail);

                if (data.loginEmail === "Admin@gmail.com" && data.loginPassword === "sparjan") {
                    alert("Admin login successful");
                    adminlogin(); // Call admin login function
                    setRedirect(false);
                } else if (user) {
                    if (user.password === data.loginPassword) {
                        alert("Login successful");
                        setRedirect(true);
                        
                    } else {
                        alert("Incorrect password");
                        setLogdata('')
                    }
                } else {
                    alert("User not found");
                }
            } catch (error) {
                console.error('Error logging in:', error);
                alert('Error logging in');
            }
        }
    });

    const adminlogin = () => {
        navigate("/admin"); // Redirect to the Admin component
    };

    useEffect(() => {
        StudentServices.getAllStudents().then(res => setData1(res.data)).catch(err => console.log(err));
    }, []);

    return (
        <Container id="logContainer">
            {!redirect ? (
                <Row>
                    <Col id="c3">
                        <Form onSubmit={formik.handleSubmit}>
                            <FormGroup>
                                <FormLabel htmlFor="email">Email: </FormLabel>
                                <FormControl
                                    type="email"
                                    className={"form-control" + (formik.errors.loginEmail && formik.touched.loginEmail ? " is-invalid" : "")}
                                    name="loginEmail" id="loginEmail"
                                    onChange={formik.handleChange}
                                    value={formik.values.loginEmail}
                                />
                                <FormGroup className="invalid-feedback">
                                    {formik.errors.loginEmail && formik.touched.loginEmail ? formik.errors.loginEmail : null}
                                </FormGroup>
                            </FormGroup> <br />
                            <FormGroup>
                                <FormLabel htmlFor="password">Password: </FormLabel>
                                <FormControl
                                    type="password"
                                    className={"form-control" + (formik.errors.loginPassword && formik.touched.loginPassword ? " is-invalid" : "")}
                                    name="loginPassword" id="loginPassword"
                                    onChange={formik.handleChange}
                                    value={formik.values.loginPassword}
                                />
                                <FormGroup className="invalid-feedback">
                                    {formik.errors.loginPassword && formik.touched.loginPassword ? formik.errors.loginPassword : null}
                                </FormGroup>
                            </FormGroup><br />
                            <Button type="submit" id="subBut">Login</Button>
                            <p id="p2">Register your account</p>
                            <Link to={"/"}> <Button id="regbut1">Register</Button></Link>
                        </Form>
                    </Col>
                    <Col id="c4">
                        <Images />
                    </Col>
                </Row>
            ) : (
              <MainPage  data={logdata}/>
            )}
        </Container>
    );
};

export default Login;
