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
import React from "react";
import { StudentContext } from "../../context/student-context";
import { useCreateMeetingMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { DateField } from "../input/DateField";
import { InputField } from "../input/InputField";

interface RecordMeetingModalProps {
  // isOpen: boolean;
  // onClose(): void;
}

export const RecordMeetingModal: React.FC<RecordMeetingModalProps> = ({}) => {
  const toast = useToast();
  const [, recordMeeting] = useCreateMeetingMutation();
  return (
    <StudentContext.Consumer>
      {(context) => (
        <Modal
          onClose={context.onClose}
          size="md"
          isOpen={context.isOpen}
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
                  studentID: context.student,
                  meetingDate: "",
                  duration: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  console.log(values);
                  const response = await recordMeeting({
                    options: {
                      duration: parseInt(values.duration),
                      studentID: parseInt(values.studentID),
                      meetingDate: values.meetingDate,
                    },
                  });
                  if (response.error) {
                    toast({
                      title: "Not Authenticated",
                      description: "Only coaches can record meetings",
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                    });
                  } else if (response.data?.createMeeting.errors) {
                    console.log(
                      toErrorMap(response.data?.createMeeting.errors)
                    );
                    setErrors(toErrorMap(response.data?.createMeeting.errors));
                  } else if (response.data?.createMeeting?.meeting != null) {
                    toast({
                      title: "Meeting recorded.",
                      description:
                        "A new meeting has been successfully recorded.",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                    context.onClose();
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
                      <DateField label="Meeting Date" name="meetingDate" />
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
      )}
    </StudentContext.Consumer>
  );
};
