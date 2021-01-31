import React from "react";
import { DatePicker, DatePickerInput } from "carbon-components-react";
import "carbon-components/css/carbon-components.min.css";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { useField } from "formik";

interface DateFieldProps {
  label: string;
  name: string;
}

export const DateField: React.FC<DateFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <DatePicker id={field.name} datePickerType="single">
        <DatePickerInput placeholder="mm/dd/yyyy" id="date-picker-single" />
      </DatePicker>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
