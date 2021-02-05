import {
  Box,
  Button,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useCreateStudentMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../input/InputField";
import { SelectField } from "../input/SelectField";

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose(): void;
}

const CreateStudentModal: React.FC<CreateStudentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const [, createStudent] = useCreateStudentMutation();
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
            <Heading>CREATE STUDENT</Heading>
          </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              population: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const { data, error: serverError } = await createStudent({
                options: values,
              });
              /*    ERRORS BEFORE RUNNING THE RESOLVERS     */
              if (serverError) {
                toast({
                  title: "Not Authenticated",
                  description: "Only coordinators can create new students",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
                /*    ERRORS FROM FORM VALIDATION     */
              } else if (data?.createStudent.errors) {
                console.log(toErrorMap(data?.createStudent?.errors));
                setErrors(toErrorMap(data?.createStudent?.errors));
                /*    NO FORM OR RESOLVER ERRORS, SO LETS GOO!!    */
              } else if (data?.createStudent?.student) {
                toast({
                  title: "Student created.",
                  description: "A new student has been successfully created.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                onClose();
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  autoFocus
                  name="firstName"
                  placeholder="first name"
                  label="First Name"
                />
                <Box mt={4}>
                  <InputField
                    name="lastName"
                    placeholder="last name"
                    label="Last Name"
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
                  <SelectField label="Population" name="population">
                    <option value="star">STAR</option>
                    <option value="span">SPAN</option>
                    <option value="athlete">Atlete</option>
                    <option value="veteran">Veteran</option>
                    <option value="voluntary">Voluntary</option>
                  </SelectField>
                </Box>

                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="red"
                >
                  create student
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

export default withUrqlClient(createUrqlClient)(CreateStudentModal);
