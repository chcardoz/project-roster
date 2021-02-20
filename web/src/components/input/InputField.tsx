import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import { FormControl, FormHelperText, TextField } from "@material-ui/core";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl>
      <TextField
        {...field}
        label={label}
        name={props.name}
        id={label}
        error={error ? true : false}
        type={props.type}
        variant="outlined"
      />
      {error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
};
