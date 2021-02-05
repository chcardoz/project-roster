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
  useToast,
  Center,
  Heading,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { useRegisterMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../input/InputField";

interface RegisterModalProps {
  isOpen: boolean;
  onClose(): void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const [, register] = useRegisterMutation();
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
            <Heading>REGISTER</Heading>
          </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              username: "",
              password: "",
              email: "",
              firstName: "",
              lastName: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const { data, error } = await register({ options: values });
              if (error) {
                //TODO: Toast or alert the combined error from the server
              } else if (data?.registerCoach.errors) {
                setErrors(toErrorMap(data?.registerCoach.errors));
              } else if (data?.registerCoach.coach != null) {
                onClose();
                toast({
                  title: "Account created.",
                  description: "We've created your account for you.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  autoFocus
                  name="username"
                  placeholder="username"
                  label="Username"
                />
                <Box mt={4}>
                  <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="email"
                    placeholder="email"
                    label="Email"
                    type="email"
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="firstName"
                    placeholder="firstname"
                    label="First Name"
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="lastName"
                    placeholder="lastname"
                    label="Last Name"
                  />
                </Box>

                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="red"
                >
                  create account
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
