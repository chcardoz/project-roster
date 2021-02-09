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
    input: {
      paddingTop: 20,
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
    >
      <DialogTitle id="alert-dialog-title">{"REGISTER"}</DialogTitle>
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
                <Box>
                  <InputField
                    type="password"
                    label="Password"
                    name="password"
                  />
                </Box>
                <Box className={classes.input}>
                  <InputField
                    type="password"
                    label="Password"
                    name="password"
                  />
                </Box>
                <Box className={classes.input}>
                  <InputField
                    type="password"
                    label="Password"
                    name="password"
                  />
                </Box>
                <Box className={classes.input}>
                  <InputField
                    type="password"
                    label="Password"
                    name="password"
                  />
                </Box>
                <Button
                  variant="contained"
                  disabled={isSubmitting}
                  type="submit"
                  color="primary"
                >
                  create account
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
