import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAllOutreachQuery, useMeQuery } from "../../generated/graphql";

interface OutreachTableProps {
  week: number;
}

export const OutreachTable: React.FC<OutreachTableProps> = ({ week }) => {
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: null as null | string,
  });
  const [{ data: coachData }] = useMeQuery();
  const [{ data, fetching }] = useAllOutreachQuery({
    variables: {
      options: {
        ...variables,
      },
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
        <Td>
          <Menu>
            <MenuButton as={Button}>Actions</MenuButton>
            <MenuList>
              <MenuItem>Request to be removed</MenuItem>
              <MenuItem>Edit Details</MenuItem>
              <MenuItem>Remove</MenuItem>
              <MenuItem>Add outreach</MenuItem>
              <MenuItem>Add a meeting</MenuItem>
            </MenuList>
          </Menu>
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
