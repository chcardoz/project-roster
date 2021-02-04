import { withUrqlClient } from "next-urql";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Heading, Text, Spinner } from "@chakra-ui/react";
import { useMeQuery } from "../generated/graphql";
import React from "react";
import { WeekTabs } from "../components/tables/WeekTabs";

const Meetings = () => {
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
          you can record it by using the actions option next to every student.
        </Text>
      </>
    );
    tabs = <WeekTabs variant="meeting" />;
  }

  return (
    <>
      <Wrapper>{header}</Wrapper>
      {tabs === null ? null : <Wrapper>{tabs}</Wrapper>}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Meetings);
