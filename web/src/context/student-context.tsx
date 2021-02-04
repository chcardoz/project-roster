import React from "react";
import { Student } from "../generated/graphql";

type ContextProps = {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
  student: Pick<
    Student,
    "id" | "email" | "firstName" | "lastName" | "createdAt"
  >;
  updateStudent: (
    _student: Pick<
      Student,
      "id" | "email" | "firstName" | "lastName" | "createdAt"
    >
  ) => void;
};

export const StudentContext = React.createContext<ContextProps>(null);
