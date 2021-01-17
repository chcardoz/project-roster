import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "length must be greater than 2",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "cannot include an @",
      },
    ];
  }

  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "length must be greater than 2",
      },
    ];
  }

  if (options.firstName === "" || options.lastName === "") {
    return [
      {
        field: "firstName",
        message: "first name cannot be empty",
      },
      {
        field: "lastName",
        message: "last name cannot be empty",
      },
    ];
  }

  return null;
};

export const validateNewPassword = (newPassword: string) => {
  if (newPassword.length <= 2) {
    return [
      {
        field: "newPassword",
        message: "length must be greater than 2",
      },
    ];
  }
  return null;
};
