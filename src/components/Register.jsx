import { useFormik } from "formik";
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row, Container } from "react-bootstrap";
import *as Yup from "yup";
import StudentServices from "../services/StudentServices";
import { Link } from "react-router-dom";
import Images from "../images/image";
import "./StyleSheets/register.css";




const Register = () => {
    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.number().required("phoneNumber is required and must be unique"),
        userName: Yup.string().required("user name is required"),
        dob: Yup.date().required("age is required"),
        email: Yup.string().required("email is required").email("email is invalid"),
        password: Yup.string().required("password is required").min(6, 'password must be ina 6 charecters').max(40, 'password must not exceded 40 charecters'),
        confirmPassword: Yup.string().required("confirm password is required").oneOf([Yup.ref('password'), null], 'confirmPassword does not match')

    })
    const formik = useFormik({
        initialValues: {

            userName: "",
            dob: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: ""
        },
        validationSchema,
        onSubmit: (data, { resetForm }) => {
            StudentServices.createStudentData(JSON.stringify(data, null, 1))
                .then(res => {
                    console.log(res.data);
                    resetForm(); // Reset the form after successful submission
                })
                .catch(e => console.log(e));
        }
    })

    return (
        <Container id="container1">
            <Row>
                <h3 id="heading1">welcome friend</h3>
            </Row>
            <Row>
                <Col id="c1">
                    <Form action="" onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <FormLabel htmlFor="userName">userName:</FormLabel>
                            <FormControl
                                type="text"
                                className={"form-control" + formik.errors.userName && formik.touched.userName ? " is-invalid" : ""}
                                name="userName" id="userName"
                                onChange={formik.handleChange}
                                value={formik.values.userName}
                            />
                            <FormGroup className="invalid-feedback">
                                {formik.errors.userName && formik.touched.userName ? formik.errors.userName : null}
                            </FormGroup>
                        </FormGroup>
                        <br />
                        <FormGroup >
                            <FormLabel htmlFor="email">email : </FormLabel>
                            <FormControl
                                type="email"
                                className={"form-control" + formik.errors.email && formik.touched.email ? " is-invalid" : ""}
                                name="email" id="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <FormGroup className="invalid-feedback">
                                {formik.errors.email && formik.touched.email ? formik.errors.email : null}
                            </FormGroup>
                        </FormGroup>
                        <br />
                        <FormGroup >
                            <FormLabel htmlFor="password ">password : </FormLabel>
                            <FormControl
                                type="password"
                                className={"form-control" + formik.errors.password && formik.touched.password ? " is-invalid" : ""}
                                name="password" id="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            <FormGroup className="invalid-feedback">
                                {formik.errors.password && formik.touched.password ? formik.errors.password : null}
                            </FormGroup>
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <FormLabel htmlFor="confirmPassword">confirm password : </FormLabel>
                            <FormControl
                                type="password"
                                className={"form-control" + formik.errors.confirmPassword && formik.touched.confirmPassword ? " is-invalid" : ""}
                                name="confirmPassword" id="confirmPassword"
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                            />
                            <FormGroup className="invalid-feedback">
                                {formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : null}
                            </FormGroup>
                        </FormGroup>

                        <br />
                        <FormGroup >
                            <FormLabel htmlFor="dob">dob : </FormLabel>
                            <FormControl
                                type="date"
                                className={"form-control" + formik.errors.dob && formik.touched.dob ? " is-invalid" : ""}
                                name="dob" id="dob"
                                onChange={formik.handleChange}
                                value={formik.values.dob}
                            />
                            <FormGroup className="invalid-feedback">
                                {formik.errors.dob && formik.touched.dob ? formik.errors.dob : null}
                            </FormGroup>
                        </FormGroup>

                        <br />
                        <FormGroup >
                            <FormLabel htmlFor="phoneNumber">phoneNumber : </FormLabel>
                            <FormControl
                                type="number"
                                className={"form-control" + formik.errors.phoneNumber && formik.touched.phoneNumber ? " is-invalid" : ""}
                                name="phoneNumber" id="phoneNumber"
                                onChange={formik.handleChange}
                                value={formik.values.phoneNumber}
                            />
                            <FormGroup className="invalid-feedback">
                                {formik.errors.phoneNumber && formik.touched.phoneNumber ? formik.errors.phoneNumber : null}
                            </FormGroup>
                        </FormGroup>

                        <br />

                        <FormGroup >
                            <Button
                                className="btn btn-primary"
                                type="submit" id="regbut">
                                register
                            </ Button>
                            <p id="p1">OR Already Have an Account</p> <Link to={"/login"} ><Button id="logbut">login</Button></Link>

                        </FormGroup>
                    </Form>
                </Col>
                <Col id="c2">
                    <Images />
                    {/* <img src="./images1/img1.jpg" alt=" no images" /> */}
                </Col>
            </Row>
        </Container>
    )
}
export default Register;