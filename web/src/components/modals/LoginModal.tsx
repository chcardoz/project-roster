import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import { useLoginMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../input/InputField";

interface LoginModalProps {
  isOpen: boolean;
  onClose(): void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [, login] = useLoginMutation();
  return (
    <Modal
      onClose={onClose}
      size="sm"
      isOpen={isOpen}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Center>
            <Heading>LOGIN</Heading>
          </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
                onClose();
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  autoFocus
                  name="username"
                  placeholder="username or email"
                  label="Username or Email"
                />
                <Box mt={4}>
                  <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                  />
                </Box>
                <Flex mt={2}>
                  <NextLink href="/forgot-password">
                    <Link onClick={onClose} ml="auto">
                      forgot password?
                    </Link>
                  </NextLink>
                </Flex>
                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="red"
                >
                  login
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default withUrqlClient(createUrqlClient)(LoginModal);
