import {
  FieldError,
  MeetingFieldError,
  OutreachFieldError,
  StudentFieldError,
} from "../generated/graphql";

type CombinedFieldError =
  | FieldError[]
  | StudentFieldError[]
  | MeetingFieldError[]
  | OutreachFieldError[];

export const toErrorMap = (errors: CombinedFieldError) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
