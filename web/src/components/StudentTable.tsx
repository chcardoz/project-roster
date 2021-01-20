import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAllStudentsQuery } from "../generated/graphql";

interface StudentTableProps {}

export const StudentTable: React.FC<StudentTableProps> = ({}) => {
  const [variables, setVariables] = useState({
    limit: 12,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = useAllStudentsQuery({
    variables: {
      coachID: 2,
      ...variables,
    },
  });
  return (
    <>
      <Table variant="striped" colorScheme="facebook">
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th>Population</Th>
            <Th>Options</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.allStudents.allStudents.map((student) => (
            <Tr>
              <Td>{student.firstName}</Td>
              <Td>{student.lastName}</Td>
              <Td>{student.email}</Td>
              <Td>{student.population}</Td>
              <Td>
                <Button rounded="full" size="xs">
                  <HamburgerIcon />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
