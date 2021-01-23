import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useCreateStudentMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../input/InputField";
import { SelectField } from "../input/SelectField";

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose(): void;
}

export const CreateStudentModal: React.FC<CreateStudentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const population = [
    "STAR Reinstated",
    "STAR Probation",
    "Voluntary Veteran",
    "Voluntary",
    "Admitted with Expectations",
    "Veteran",
    "Athlete",
    "SPAN",
  ];
  const router = useRouter();
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
            <Text fontSize={30} fontWeight="bold">
              CREATE NEW STUDENT
            </Text>
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
              const response = await createStudent({ options: values });
              if (response.error) {
                toast({
                  title: "Not Authenticated",
                  description: "Only coordinators can create new students",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              } else if (response.data?.createStudent.errors) {
                console.log(toErrorMap(response.data?.createStudent?.errors));
                setErrors(toErrorMap(response.data?.createStudent?.errors));
              } else if (response.data?.createStudent?.student != null) {
                toast({
                  title: "Student created.",
                  description: "A new student has been successfully created.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                onClose();
                router.push("/roster");
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
