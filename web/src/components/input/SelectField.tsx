import React, { SelectHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";

type SelectFieldProps = SelectHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

// '' => false
// 'error message stuff' => true

export const SelectField: React.FC<SelectFieldProps> = ({
  placeholder,
  children,
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select {...field} placeholder={placeholder} id={field.name}>
        {children}
      </Select>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
