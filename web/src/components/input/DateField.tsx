import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React from "react";
import DatePicker from "./DatePicker";

interface DateFieldProps {
  label: string;
  name: string;
}

export const DateField: React.FC<DateFieldProps> = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <DatePicker
        {...field}
        {...props}
        selectedDate={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        showPopperArrow
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
