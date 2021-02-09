import {
  Box,
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../input/InputField";

interface RegisterProps {
  open: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
  })
);

export const Register: React.FC<RegisterProps> = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{"REGISTER"}</DialogTitle>
      <DialogContent>
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
              <div className={classes.container}>
                <InputField label="First Name" name="username" />
                <br />
                <InputField label="Last Name" name="lastName" />
                <br />
                <InputField label="Username" name="username" />

                <br />
                <InputField type="password" label="Password" name="password" />

                <br />
                <InputField label="Email" name="email" />

                <br />
                <Button
                  variant="contained"
                  disabled={isSubmitting}
                  type="submit"
                  color="primary"
                >
                  create account
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
