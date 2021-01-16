import { Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Wrapper } from "../components/Wrapper";
import { useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isServer } from "../utils/isServer";

const Index = () => {
  const [{ data }] = useMeQuery({
    pause: isServer(),
  });

  return (
    <>
      <Wrapper>
        {data?.currentCoach === null ? (
          <Heading>Please log in to see you dashboard</Heading>
        ) : (
          <Heading>Hello there {data?.currentCoach?.firstName}</Heading>
        )}
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
