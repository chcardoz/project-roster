import React, { SelectHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
} from "@material-ui/core";

type SelectFieldProps = SelectHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  children,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        variant="outlined"
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        name={props.name}
        label={label}
        {...field}
      >
        {children}
      </Select>
      {error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
};
