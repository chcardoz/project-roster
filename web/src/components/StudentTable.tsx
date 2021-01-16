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
import React from "react";
import { useAllStudentsQuery } from "../generated/graphql";

interface StudentTableProps {}

export const StudentTable: React.FC<StudentTableProps> = ({}) => {
  const [{ data }] = useAllStudentsQuery();
  return (
    <>
      <Text fontSize={20} py={5}>
        Wow! you have {data?.allStudents.length} students
      </Text>
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
          {data?.allStudents.map((student) => (
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
