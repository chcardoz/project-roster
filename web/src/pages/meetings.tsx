import { Paper } from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import MeetingGrid from "../components/tables/MeetingGrid";
import { createUrqlClient } from "../utils/createUrqlClient";

const Meetings = () => {
  return (
    <>
      <Paper>
        <MeetingGrid />
      </Paper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Meetings);
