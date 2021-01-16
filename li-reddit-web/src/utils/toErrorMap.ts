import { FieldError, StudentFieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[] | StudentFieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
