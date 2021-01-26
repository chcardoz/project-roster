import { OutreachInput } from "src/resolvers/types/OutreachInput";

export const validateNewOutreach = (options: OutreachInput) => {
  if (!options.studentID) {
    return [
      {
        field: "studentID",
        message: "A student id is required",
      },
    ];
  }

  if (options.outreachDate.length == 0) {
    return [
      {
        field: "outreachDate",
        message: "A outreach date is required",
      },
    ];
  }
  if (!options.type) {
    return [
      {
        field: "type",
        message: "A outreach type is required",
      },
    ];
  }
  return null;
};
