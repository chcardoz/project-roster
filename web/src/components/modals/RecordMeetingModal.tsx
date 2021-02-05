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

interface RecordMeetingModalProps {}

export const RecordMeetingModal: React.FC<RecordMeetingModalProps> = ({}) => {
  const toast = useToast();
  const [, recordMeeting] = useCreateMeetingMutation();
  return (
    <StudentContext.Consumer>
      {({ onClose, isOpen, student }) => (
        <Modal
          onClose={onClose}
          size="md"
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
                  studentID: "",
                  meetingDate: "",
                  duration: "",
                }}
                onSubmit={async ({ duration, meetingDate }, { setErrors }) => {
                  const { data, error } = await recordMeeting({
                    options: {
                      duration: parseInt(duration),
                      studentID: student.id,
                      meetingDate: meetingDate,
                    },
                  });
                  /*    ERRORS BEFORE RUNNING THE RESOLVERS     */
                  if (error) {
                    toast({
                      title: "Not Authenticated",
                      description: "Only coaches can record meetings",
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                    });
                    /*    ERRORS FROM FORM VALIDATION     */
                  } else if (data?.createMeeting.errors) {
                    setErrors(toErrorMap(data?.createMeeting.errors));
                    /*    NO FORM OR RESOLVER ERRORS, SO LETS GOO!!    */
                  } else if (data?.createMeeting?.meeting) {
                    toast({
                      title: "Meeting recorded.",
                      description:
                        "A new meeting has been successfully recorded.",
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
                      disabled
                      autoFocus
                      name="studentID"
                      placeholder={student.firstName}
                      label="Student"
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
