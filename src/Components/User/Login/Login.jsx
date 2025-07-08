// src/User/LoginForm.js
import React from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAsync } from "../slices/Loginslice";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Box } from "@mui/system";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(loginAsync(values));

      if (data.meta.requestStatus === "rejected") {
        toast.error(data.payload.message);
      }

      const token = localStorage.getItem("jwt");
      const is_admin = localStorage.getItem("is_admin");

      if (token && is_admin === "false") {
        toast.success("Login successful");
        navigate("/");
        window.location.reload();
      }

      if (token && is_admin === "true") {
        toast.success("Admin login successful");
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  return (
    <Box>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "70vh",
          marginTop: "100px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  type="text"
                  label="Username"
                  name="username"
                  variant="outlined"
                  fullWidth
                />
                <Box sx={{ color: "red" }}>
                  <ErrorMessage name="username" />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  type="password"
                  label="Password"
                  name="password"
                  variant="outlined"
                  fullWidth
                />
                <Box sx={{ color: "red" }}>
                  <ErrorMessage name="password" />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Container>
    </Box>
  );
}

export default LoginForm;

