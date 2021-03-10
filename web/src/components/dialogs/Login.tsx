import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  makeStyles,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../input/InputField";
import NextLink from "next/link";
import { toErrorMap } from "../../utils/toErrorMap";
import { useLoginMutation } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface LoginProps {
  open: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      paddingTop: 20,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
  })
);

const Login: React.FC<LoginProps> = ({ open, handleClose }) => {
  const [, login] = useLoginMutation();
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
      <DialogTitle id="alert-dialog-title">{"LOGIN"}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const { data, error: serverError } = await login(values);
            if (serverError) {
              //TODO: A toast or alert for the server error.
            }
            /*    ERRORS FROM FORM VALIDATION     */
            if (data?.loginCoach.errors) {
              setErrors(toErrorMap(data.loginCoach.errors));
              /*    NO ERRORS!   */
            } else if (data?.loginCoach.coach) {
              handleClose();
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={classes.container}>
                <InputField label="Username" name="username" />
                <br />
                <InputField type="password" label="Password" name="password" />
                <br />
                <NextLink href="/forgot-password">
                  <Link>forgot password?</Link>
                </NextLink>
                <br />
                <Button
                  variant="contained"
                  disabled={isSubmitting}
                  type="submit"
                  color="primary"
                >
                  LOGIN
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

export default Login;
