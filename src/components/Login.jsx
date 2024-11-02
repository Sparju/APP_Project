import { useFormik } from "formik";
import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import "./StyleSheets/login.css";
import StudentServices from "../services/StudentServices";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import MainPage from "./interface/interface";
import Images from "../images/image";
import Token from "../common/Token";
import { login } from "../services/Action.js/ActionIndex";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, TextField, InputAdornment, IconButton, Alert } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const [alert, setAlert] = useState({ loferr: false, logsucc: false });
    const [data1, setData1] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

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
                resetForm();
                const user = data1.find(user => user.email === data.loginEmail);

                if (data.loginEmail === "Admin@gmail.com" && data.loginPassword === "sparjan") {
                    alert("Admin login successful");
                    adminlogin(); 
                } else if (user) {
                    if (user.password === data.loginPassword) {
                        setAlert({ logsucc: true, loferr: false });
                        dispatch(login());
                        Token.setUserLogin(true);
                        navigate("/dashboard");
                    } else {
                        setAlert({ logsucc: false, loferr: true });
                    }
                } else {
                    setAlert({ logsucc: false, loferr: true });
                }
            } catch (error) {
                console.error('Error logging in:', error);
                setAlert({ logsucc: false, loferr: true });
            }
        }
    });

    const adminlogin = () => {
        navigate("/admin");
    };

    useEffect(() => {
        StudentServices.getAllStudents().then(res => setData1(res.data)).catch(err => console.log(err));
    }, []);

    // Timer for alerts
    useEffect(() => {
        if (alert.logsucc || alert.loferr) {
            const timer = setTimeout(() => {
                setAlert({ logsucc: false, loferr: false });
            }, 2000); // Alert will disappear after 3 seconds
            return () => clearTimeout(timer); // Cleanup the timer on unmount
        }
    }, [alert]);

    return (
        <Box className="logContainer">
            {alert.logsucc && <Alert severity="success">Login Successfully</Alert>}
            {alert.loferr && <Alert severity="error">Invalid user</Alert>}
            <Row>
                <Col id="c8">
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="loginEmail"
                            id="loginEmail"
                            onChange={formik.handleChange}
                            value={formik.values.loginEmail}
                            error={formik.touched.loginEmail && Boolean(formik.errors.loginEmail)}
                            helperText={formik.touched.loginEmail && formik.errors.loginEmail}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="loginPassword"
                            id="loginPassword"
                            type={showPassword ? 'text' : 'password'}
                            onChange={formik.handleChange}
                            value={formik.values.loginPassword}
                            error={formik.touched.loginPassword && Boolean(formik.errors.loginPassword)}
                            helperText={formik.touched.loginPassword && formik.errors.loginPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(prev => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Grid textAlign={"center"} mt={1}>
                            <Button type="submit" variant="contained">Submit</Button>
                        </Grid>
                        <Grid textAlign={"center"} mt={1}>
                            <span><Link to={"/"}> Register </Link>your account</span>
                        </Grid>
                    </form>
                </Col>
                <Col id="c4">
                    <Images />
                </Col>
            </Row>
        </Box>
    );
};

export default Login;
