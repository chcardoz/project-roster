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
  Text,
  Heading,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { useCreateOutreachMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { DateField } from "../input/DateField";
import { InputField } from "../input/InputField";
import { SelectField } from "../input/SelectField";

interface RecordOutreachModalProps {
  isOpen: boolean;
  onClose(): void;
}

export const RecordOutreachModal: React.FC<RecordOutreachModalProps> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const [, recordOutreach] = useCreateOutreachMutation();
  return (
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
            onSubmit={async (values, { setErrors }) => {
              const response = await recordOutreach({
                options: {
                  outreachDate: values.outreachDate,
                  studentID: parseInt(values.studentID),
                  type: values.type,
                },
              });
              if (response.error) {
                toast({
                  title: "Not Authenticated",
                  description: "Only coaches can record outreach",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              } else if (response.data?.createOutreach.errors) {
                console.log(toErrorMap(response.data?.createOutreach?.errors));
                setErrors(toErrorMap(response.data?.createOutreach?.errors));
              } else if (response.data?.createOutreach?.outreach != null) {
                toast({
                  title: "Outreach recorded.",
                  description: "A new outreach has been successfully recorded.",
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
  );
};
