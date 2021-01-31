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
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { useCreateOutreachMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
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
              RECORD OUTREACH
            </Text>
          </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              studentID: null,
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
                  //TODO: Insert datepicker component somehow and put in form
                  control
                  <InputField
                    name="outreachDate"
                    placeholder="outreach date"
                    label="Outreach Date"
                  />
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
