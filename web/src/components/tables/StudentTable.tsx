import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Alert,
  AlertIcon,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAllStudentsQuery, useMeQuery } from "../../generated/graphql";

interface StudentTableProps {}

export const StudentTable: React.FC<StudentTableProps> = ({}) => {
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: null as null | string,
  });
  const [{ data: coachData }] = useMeQuery();
  const [{ data, fetching }] = useAllStudentsQuery({
    variables: {
      coachID:
        coachData?.currentCoach === null ? null : coachData?.currentCoach.id,
      ...variables, //your pagination parameters like limit and cursor
    },
  });

  //This is a way to account for all cases of data, null data and fetching data
  let tableBody = null;
  if (!fetching && !data) {
    <Tr>
      <Td>
        <Alert status="error">
          <AlertIcon />
          Your query failed for some reason
        </Alert>
      </Td>
    </Tr>;
  } else if (!data && fetching) {
    tableBody = (
      <Tr>
        <Td>
          <Skeleton />
        </Td>
      </Tr>
    );
  } else {
    tableBody = data?.allStudents.allStudents.map((student) => (
      <Tr key={student.id}>
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
    ));
  }

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
        <Tbody>{tableBody}</Tbody>
      </Table>
      {data && data?.allStudents.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor:
                  data.allStudents.allStudents[
                    data.allStudents.allStudents.length - 1
                  ].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            next page
          </Button>
        </Flex>
      ) : null}
    </>
  );
};
