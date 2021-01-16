import { Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";

const Meetings = () => {
  return (
    <Wrapper>
      <Heading>Meetings</Heading>
      <Text>
        You will find all of your meeting details here. To create a new meeting,
        click on the new meeting button
      </Text>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Meetings);
