import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Center,
  Text,
  Flex,
  Link,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useLoginMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../InputField";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface LoginModalProps {
  isOpen: boolean;
  onClose(): void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
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
            <Text fontSize={35} fontWeight="bold">
              LOGIN
            </Text>
          </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login(values);
              if (response.data?.loginCoach.errors) {
                setErrors(toErrorMap(response.data.loginCoach.errors));
              } else if (response.data?.loginCoach.coach) {
                // Got to the home page
                onClose();
                router.push("/");
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
