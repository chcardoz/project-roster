import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Center,
  ModalCloseButton,
  ModalBody,
  Box,
  Button,
  ModalFooter,
  Heading,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { StudentContext } from "../../context/student-context";
import { useCreateOutreachMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { DateField } from "../input/DateField";
import { InputField } from "../input/InputField";
import { SelectField } from "../input/SelectField";

interface RecordOutreachModalProps {}

export const RecordOutreachModal: React.FC<RecordOutreachModalProps> = ({}) => {
  const toast = useToast();
  const [, recordOutreach] = useCreateOutreachMutation();
  return (
    <StudentContext.Consumer>
      {({ onCloseOutreach, isOpenOutreach, student }) => (
        <Modal
          onClose={onCloseOutreach}
          size="md"
          isOpen={isOpenOutreach}
          isCentered
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Center>
                <Heading>RECORD OUTREACH</Heading>
              </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{
                  studentID: "",
                  outreachDate: "",
                  type: "",
                }}
                onSubmit={async ({ outreachDate, type }, { setErrors }) => {
                  const { data, error } = await recordOutreach({
                    options: {
                      outreachDate: outreachDate,
                      studentID: student.id,
                      type: type,
                    },
                  });
                  /*    ERRORS BEFORE RUNNING THE RESOLVERS     */
                  if (error) {
                    toast({
                      title: "Not Authenticated",
                      description: "Only coaches can record outreach",
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                    });
                    /*    ERRORS FROM FORM VALIDATION     */
                  } else if (data?.createOutreach?.errors) {
                    console.log(toErrorMap(data?.createOutreach?.errors));
                    setErrors(toErrorMap(data?.createOutreach?.errors));
                    /*    NO FORM OR RESOLVER ERRORS, SO LETS GOO!!    */
                  } else if (data?.createOutreach?.outreach != null) {
                    toast({
                      title: "Outreach recorded.",
                      description:
                        "A new outreach has been successfully recorded.",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                    onCloseOutreach();
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputField
                      autoFocus
                      name="studentID"
                      placeholder={student.firstName}
                      label="Student"
                    />
                    <Box mt={4}>
                      <DateField label="Meeting Date" name="meetingDate" />
                    </Box>
                    <Box mt={4}>
                      <SelectField label="Outreach type" name="type">
                        <option value="star">Email</option>
                        <option value="span">Adrx campaign</option>
                        <option value="athlete">Group Me</option>
                        <option value="veteran">Texting</option>
                        <option value="voluntary">Call</option>
                      </SelectField>
                    </Box>

                    <Button
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="red"
                    >
                      record outreach
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
