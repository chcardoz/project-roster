import { Box, Button } from "@chakra-ui/react";
import { Paper } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/input/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Paper>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              If an account with that email exists, then we have sent you an
              email
            </Box>
          ) : (
            <Form>
              <Box mt={4}>
                <InputField
                  name="email"
                  placeholder="email"
                  label="Please enter you email"
                  type="email"
                />
              </Box>

              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="red"
              >
                forgot password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Paper>
  );
};

export default ForgotPassword;
