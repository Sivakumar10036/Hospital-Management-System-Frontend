import React from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Avatar,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const theme = createTheme();

function SignUpForm() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    location: "",
    phone: "",
  };

  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    gender: yup.string().required("Gender is required"),
    age: yup.string().required("Age is required"),
    location: yup.string().required("Location is required"),
    phone: yup.string().required("Phone is required"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/signup`,
        values,
        { withCredentials: true }
      );

      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during signup.");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
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
                    name="username"
                    label="Username"
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
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                  />
                  <Box sx={{ color: "red" }}>
                    <ErrorMessage name="email" />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                  />
                  <Box sx={{ color: "red" }}>
                    <ErrorMessage name="password" />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel id="gender-label">Gender</FormLabel>
                    <Field name="gender" as={RadioGroup} row>
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </Field>
                  </FormControl>
                  <Box sx={{ color: "red" }}>
                    <ErrorMessage name="gender" />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="age"
                    label="Age"
                    variant="outlined"
                    fullWidth
                  />
                  <Box sx={{ color: "red" }}>
                    <ErrorMessage name="age" />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="location"
                    label="Location"
                    variant="outlined"
                    fullWidth
                  />
                  <Box sx={{ color: "red" }}>
                    <ErrorMessage name="location" />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="phone"
                    label="Phone"
                    variant="outlined"
                    fullWidth
                  />
                  <Box sx={{ color: "red" }}>
                    <ErrorMessage name="phone" />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUpForm;








