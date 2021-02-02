import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAllStudentsQuery, useMeQuery } from "../../generated/graphql";
import { CoachActions } from "../actions/roster/CoachActions";
import { CoordinatorActions } from "../actions/roster/CoordinatorActions";

interface StudentTableProps {
  population: string;
}

export const StudentTable: React.FC<StudentTableProps> = ({ population }) => {
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: null as null | string,
  });
  const [{ data: coachData }] = useMeQuery();
  const [{ data, fetching }] = useAllStudentsQuery({
    variables: {
      isCoordinator:
        coachData?.currentCoach === null
          ? null
          : coachData?.currentCoach.isCoordinator,
      population,
      coachID:
        coachData?.currentCoach === null ? null : coachData?.currentCoach.id,
      ...variables, //your pagination parameters like limit and cursor
    },
  });

  //This is a way to account for all cases of data, null data and fetching data
  let tableBody = null;
  if (!fetching && !data) {
    tableBody = (
      <Alert status="error">
        <AlertIcon />
        Your query failed for some reason
      </Alert>
    );
  } else if (!data && fetching) {
    tableBody = <Text>Loading...</Text>;
  } else if (coachData?.currentCoach !== null) {
    tableBody = data?.allStudents.allStudents.map((student) => (
      <Tr key={student.id}>
        <Td>{student.firstName}</Td>
        <Td>{student.lastName}</Td>
        <Td>{student.email}</Td>
        <Td>
          {coachData?.currentCoach.isCoordinator ? (
            <CoordinatorActions />
          ) : (
            <CoachActions />
          )}
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
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>{tableBody}</Tbody>
      </Table>
      {data && data?.allStudents.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit + 5,
                cursor:
                  data.allStudents.allStudents[
                    data.allStudents.allStudents.length - 1
                  ].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            mt={5}
          >
            next page
          </Button>
        </Flex>
      ) : null}
    </>
  );
};
