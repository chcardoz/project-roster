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
      week,
      options: {
        ...variables,
        coachID:
          coachData?.currentCoach === null ? null : coachData?.currentCoach.id,
        isCoordinator:
          coachData?.currentCoach === null
            ? null
            : coachData?.currentCoach.isCoordinator,
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
    tableBody = data?.allOutreach.allOutreach.map((student) => (
      <Tr key={student.id}>
        <Td>{student.coachID}</Td>
        <Td>{student.studentID}</Td>
        <Td>{student.outreachDate}</Td>
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
      <Table size="sm" variant="striped" colorScheme="facebook">
        <Thead>
          <Tr>
            <Th>Coach</Th>
            <Th>Student</Th>
            <Th>Date of Outreach</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>{tableBody}</Tbody>
      </Table>
      {data && data?.allOutreach.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit + 5,
                cursor:
                  data.allOutreach.allOutreach[
                    data.allOutreach.allOutreach.length - 1
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
