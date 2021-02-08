import { Paper, Typography } from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isServer } from "../utils/isServer";

const Index = () => {
  const [{ data }] = useMeQuery({
    pause: isServer(),
  });

  return (
    <Paper>
      {data?.currentCoach === null ? (
        <Typography>Please log in </Typography>
      ) : (
        <Typography>Hello there coach</Typography>
      )}
    </Paper>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
