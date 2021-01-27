import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Center,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  Heading,
  Box,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useCreateStudentMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../input/InputField";

interface RecordMeetingModalProps {
  isOpen: boolean;
  onClose(): void;
}

export const RecordMeetingModal: React.FC<RecordMeetingModalProps> = ({
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
            <Heading>RECORD MEETING</Heading>
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
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  autoFocus
                  name="studentID"
                  placeholder="student id"
                  label="Student ID"
                />
                <Box mt={4}>
                  <InputField
                    name="meetingDate"
                    placeholder="meeting date"
                    label="Meeting Date"
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="duration"
                    placeholder="30"
                    label="Meeting Duration (in minutes)"
                  />
                </Box>
                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="red"
                >
                  record a meeting
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
