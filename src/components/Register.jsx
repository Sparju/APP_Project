import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormGroup, FormControl, Grid, TextField, Button, IconButton, InputAdornment, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import StudentServices from '../services/StudentServices';
import Images from '../images/image';

const Register = () => {
    const [alert, setAlert] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.number().required("Phone number is required and must be unique"),
        dob: Yup.date().required("Date of birth is required"),
        userName: Yup.string().required("User name is required"),
        email: Yup.string().required("Email is required").email("Email is invalid"),
        password: Yup.string().required("Password is required").min(6, 'Password must be at least 6 characters').max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref('password'), null], 'Confirm password does not match')
    });

    const formik = useFormik({
        initialValues: {
            userName: "",
            email: "",
            dob: "",
            password: "",
            confirmPassword: "",
            phoneNumber: ""
        },
        validationSchema,
        onSubmit: (data, { resetForm }) => {
            StudentServices.createStudentData(JSON.stringify(data, null, 1))
                .then(res => {
                    console.log(res.data);
                    resetForm();
                    setAlert(true);
                })
                .catch(e => console.log(e));
        }
    });

    return (
        <Box className="regContainer">
            <Grid container>
                <Grid item sm={12}>
                    {alert &&
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="success">User successfully registered</Alert>
                        </Stack>}
                </Grid>
                <Grid item sm={6} className="gridItem">
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl fullWidth>
                            <TextField
                                id="userName"
                                label='Username'
                                placeholder='Enter your username'
                                variant="outlined"
                                className={`textField ${formik.errors.userName && formik.touched.userName ? "is-invalid" : ""}`}
                                name="userName"
                                onChange={formik.handleChange}
                                value={formik.values.userName}
                                margin="dense"
                            />
                            <FormGroup className="invalid-feedback">
                                {formik.errors.userName && formik.touched.userName ? formik.errors.userName : null}
                            </FormGroup>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                id="email"
                                label='Email'
                                placeholder='Enter your email'
                                variant="outlined"
                                className={`textField ${formik.errors.email && formik.touched.email ? "is-invalid" : ""}`}
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                margin="dense"
                            />
                            <FormGroup className="invalid-feedback">
                                {formik.errors.email && formik.touched.email ? formik.errors.email : null}
                            </FormGroup>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                id="password"
                                label='Password'
                                placeholder='Create a password'
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                className={`textField ${formik.errors.password && formik.touched.password ? "is-invalid" : ""}`}
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? "👁️" : "👁️‍🗨️"}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                margin="dense"
                            />
                            <FormGroup className="invalid-feedback">
                                {formik.errors.password && formik.touched.password ? formik.errors.password : null}
                            </FormGroup>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                id="confirmPassword"
                                label='Confirm Password'
                                placeholder='Confirm your password'
                                type={showConfirmPassword ? "text" : "password"}
                                variant="outlined"
                                className={`textField ${formik.errors.confirmPassword && formik.touched.confirmPassword ? "is-invalid" : ""}`}
                                name="confirmPassword"
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                margin="dense"
                            />
                            <FormGroup className="invalid-feedback">
                                {formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : null}
                            </FormGroup>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                id="dob"
                                type="date"
                                variant="outlined"
                                className={`textField ${formik.errors.dob && formik.touched.dob ? "is-invalid" : ""}`}
                                name="dob"
                                onChange={formik.handleChange}
                                value={formik.values.dob}
                                margin="dense"
                            />
                            <FormGroup className="invalid-feedback">
                                {formik.errors.dob && formik.touched.dob ? formik.errors.dob : null}
                            </FormGroup>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                id="phoneNumber"
                                label='Phone Number'
                                placeholder='Enter your phone number'
                                variant="outlined"
                                className={`textField ${formik.errors.phoneNumber && formik.touched.phoneNumber ? "is-invalid" : ""}`}
                                name="phoneNumber"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.phoneNumber}
                                margin="dense"
                            />
                            <FormGroup className="invalid-feedback">
                                {formik.errors.phoneNumber && formik.touched.phoneNumber ? formik.errors.phoneNumber : null}
                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>
                <Grid item sm={6} className="gridItem">
                    <Images />
                    <Grid item textAlign={"center"}>
                            <Button type="submit" variant="contained" className="submitButton">Register</Button>
                            <p> OR Already Have an Account <Link to={"/login"}>Login</Link></p>
                        </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Register;
