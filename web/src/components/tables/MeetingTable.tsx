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
import { useAllMeetingsQuery, useMeQuery } from "../../generated/graphql";

interface MeetingTableProps {
  week: string;
}

export const MeetingTable: React.FC<MeetingTableProps> = ({ week }) => {
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: null as null | string,
  });
  const [{ data: coachData }] = useMeQuery();
  const [{ data, fetching }] = useAllMeetingsQuery({
    variables: {
      week: parseInt(week),
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
    tableBody = data?.allMeetings.allMeetings.map((meeting) => (
      <Tr key={meeting.id}>
        <Td>{meeting.coachID}</Td>
        <Td>{meeting.studentID}</Td>
        <Td>{meeting.meetingDate}</Td>
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
      {data && data?.allMeetings.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit + 5,
                cursor:
                  data.allMeetings.allMeetings[
                    data.allMeetings.allMeetings.length - 1
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
