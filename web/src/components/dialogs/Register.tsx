import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useRegisterMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
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

const Register: React.FC<RegisterProps> = ({ open, handleClose }) => {
  const classes = useStyles();
  const [, register] = useRegisterMutation();
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
          initialValues={{
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const { data, error } = await register({ options: values });
            if (error) {
              //TODO: Toast or alert the combined error from the server
            } else if (data?.registerCoach.errors) {
              setErrors(toErrorMap(data?.registerCoach.errors));
            } else if (data?.registerCoach.coach != null) {
              handleClose();
              // toast({
              //   title: "Account created.",
              //   description: "We've created your account for you.",
              //   status: "success",
              //   duration: 9000,
              //   isClosable: true,
              // });
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={classes.container}>
                <InputField label="First Name" name="firstName" />
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

export default withUrqlClient(createUrqlClient)(Register);
