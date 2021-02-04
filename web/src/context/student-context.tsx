import React from "react";

export const StudentContext = React.createContext({
  student: "",
  onOpen: () => {},
  onClose: () => {},
  isOpen: true,
  updateStudent: (student: string) => {
    console.log(student);
  },
});
