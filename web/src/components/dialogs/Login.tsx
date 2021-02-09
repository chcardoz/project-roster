import {
  Box,
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  makeStyles,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../input/InputField";

interface LoginProps {
  open: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      paddingTop: 20,
    },
  })
);

export const Login: React.FC<LoginProps> = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"LOGIN"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              setErrors({
                username: "This is a error",
              });
              console.log(values);
              handleClose();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField label="Username" name="username" />
                <Box className={classes.input}>
                  <InputField
                    type="password"
                    label="Password"
                    name="password"
                  />
                </Box>
                <Box className={classes.input}>
                  <Link>forgot password?</Link>
                </Box>
                <Button
                  variant="contained"
                  disabled={isSubmitting}
                  type="submit"
                  color="primary"
                >
                  LOGIN
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
