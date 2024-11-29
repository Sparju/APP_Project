
import React, { useEffect, useState } from "react";
import InnerText from '@mui/material/Paper';
import { Form, Formik, getIn } from "formik";
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Button, Grid,  Paper, TextField } from "@mui/material";
const GridHolder = styled(Grid)(({ theme }) => ({
    marginTop: '0px !important',
}));

const Games = () => {
 
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const Initial_Values = {
        Title: "",
    };

    const Validation_Schema = Yup.object().shape({
        Title: Yup.string().required("Enter Your Title"),
    });

    const handleSubmit = (values, { resetForm }) => {


        if (editIndex !== null) {
            setTodos(todos.map((todo, index) => index === editIndex ? values : todo))
            setEditIndex(null);
        } else {
            setTodos([...todos, values]);
        }
        resetForm();
    };
    const handleDelete = (index) => {
        setTodos(todos.filter((k, i) => i !== index))
    };
    const handleEdit = (index) => {
        setEditIndex(index);
    };
    console.log(todos);

    return (
        <Paper elevation={3} >
            <Formik
                initialValues={editIndex !== null ? todos[editIndex] : Initial_Values}
                validationSchema={Validation_Schema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, handleChange, handleBlur, values }) => (
                    <Form autoComplete="off">
                        <GridHolder container ml={3} spacing={2} mb={5}direction="column">
                            <p>Todos:</p>
                            <Grid item sm={5}>
                                <TextField
                                    name="Title"
                                    placeholder={"fsdkj"}
                                    error={'Title' in touched && 'Title' in errors}
                                    helperText={getIn(touched, 'Title') && getIn(errors, 'Title')}
                                    onBlur={handleBlur}
                                    value={values.Title}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 60 }}
                                />
                            </Grid>
                            <Grid item sm={4}>
                            <Button type="submit" variant="contained">
                                {editIndex !== null ? "Update Task" : "Add Task"}
                            </Button>
                            </Grid>
                            

                            {todos.map((todo, index) => (
                                <Grid item key={index} container alignItems="center">
                                    <Grid item xs={8}>
                                        <p><strong>To do Tasks : {todo.Title}</strong></p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button  variant="contained" color="primary" onClick={() => handleEdit(index)}>
                                            Edit
                                        </Button>
                                        <Button  variant="contained" color="secondary" onClick={() => handleDelete(index)}>
                                            Delete
                                        </Button>
                                    </Grid>
                                </Grid>
                            ))}

                        </GridHolder>
                    </Form>
                )}
            </Formik>
        </Paper>
    );
};

export default Games;