import { withUrqlClient } from "next-urql";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Heading, Text, Spinner } from "@chakra-ui/react";
import { useMeQuery } from "../generated/graphql";
import React from "react";
import { WeekTabs } from "../components/tables/WeekTabs";

const Outreach = () => {
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
        <Heading>OUTREACH</Heading>
        <Text mt={3}>
          Whenever you reach out to a student, you can record the details and
          method of interaction for future reference.
        </Text>
      </>
    );
    tabs = <WeekTabs variant="outreach" />;
  }

  return (
    <>
      <Wrapper>{header}</Wrapper>
      {tabs === null ? null : <Wrapper>{tabs}</Wrapper>}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Outreach);
