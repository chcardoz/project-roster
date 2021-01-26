import { withUrqlClient } from "next-urql";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import {
  Heading,
  Text,
  useDisclosure,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useMeQuery } from "../generated/graphql";
import { PopulationTabs } from "../components/tables/PopulationTabs";
import React from "react";
import { RecordMeetingModal } from "../components/modals/RecordMeetingModal";

const Meetings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data, fetching }] = useMeQuery();

  let header = null;
  let tabs = null;
  if (fetching) {
    header = <Spinner />;
  } else if (data?.currentCoach === null) {
    header = <Heading> Please log in to see your meetings </Heading>;
    tabs = null;
  } else if (data?.currentCoach !== null) {
    header = (
      <>
        <Heading>MEETINGS</Heading>
        <Text mt={3}>
          Find all of your meetings here. After having a meeting with a student,
          you can record it with the button below.
        </Text>
        <Button mt={5} onClick={onOpen} rounded="full">
          Record Meeting
        </Button>
        <RecordMeetingModal isOpen={isOpen} onClose={onClose} />
      </>
    );
    tabs = <PopulationTabs />;
  }

  return (
    <>
      <Wrapper>{header}</Wrapper>
      {tabs === null ? null : <Wrapper>{tabs}</Wrapper>}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Meetings);
