import { StudentDetailsInput } from "src/resolvers/StudentDetailsInput";

export const validateNewStudent = (options: StudentDetailsInput) => {
  if (options.firstName.length == 0) {
    return [
      {
        field: "firstName",
        message: "A first name is required",
      },
    ];
  }

  if (options.lastName.length == 0) {
    return [
      {
        field: "lastName",
        message: "A last name is required",
      },
    ];
  }

  if (options.population.length == 0) {
    return [
      {
        field: "population",
        message: "Student population is required",
      },
    ];
  }

  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "The email is invalid",
      },
    ];
  }

  return null;
};
