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
import { RecordOutreachModal } from "../components/modals/RecordOutreachModal";

const Outreach = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data, fetching }] = useMeQuery();

  let header = null;
  let tabs = null;
  if (fetching) {
    header = <Spinner />;
  } else if (data?.currentCoach === null) {
    header = <Heading> Please log in to see your outreach </Heading>;
  } else if (data?.currentCoach !== null) {
    header = (
      <>
        <Heading>Outreach</Heading>
        <Text mt={3}>
          Whenever you reach out to a student, you can record the details and
          method of interaction for future reference.
        </Text>
        <Button mt={5} onClick={onOpen} rounded="full">
          Record Outreach
        </Button>
        <RecordOutreachModal isOpen={isOpen} onClose={onClose} />
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

export default withUrqlClient(createUrqlClient)(Outreach);
