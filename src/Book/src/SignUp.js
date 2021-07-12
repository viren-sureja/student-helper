import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Navbar from "./Navbar";
import { useFormik } from "formik";
import { login, signUp } from "./actions/loginAction";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({}));
const SignUp = (props) => {
  const classes = useStyles();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (values.email.length < 6) {
      errors.email = "Email should be atlest 6 characters long";
    }

    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "password should be atlest 6 characters long";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate,
    onSubmit: (values) => {
      props.signUp(values);
    },
  });
  return (
    <div>
      <Navbar />

      <form action="" method="POST" onSubmit={formik.handleSubmit} noValidate>
        <div style={{ margin: "25px" }}>
          <Grid
            container
            justify="center"
            alignItems="center"
            spacing={5}
            direction="column"
          >
            <Grid item xs={12} md={8}>
              <TextField
                error={formik.touched.name && formik.errors.name ? true : false}
                required
                id="name"
                name="name"
                type="text"
                label="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.name && formik.errors.name
                    ? `${formik.errors.name}`
                    : ""
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
                required
                id="email"
                name="email"
                type="email"
                label="Email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.email && formik.errors.email
                    ? `${formik.errors.email}`
                    : ""
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                required
                id="password"
                name="password"
                type="password"
                label="password"
                autoComplete="current-password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.password && formik.errors.password
                    ? `${formik.errors.password}`
                    : ""
                }
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Button
                type="submit"
                variant="outlined"
                style={{ color: "green" }}
              >
                SignUp
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { signUp })(SignUp);
