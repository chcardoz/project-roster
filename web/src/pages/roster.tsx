import { Paper } from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import StudentGrid from "../components/tables/StudentGrid";
import { createUrqlClient } from "../utils/createUrqlClient";

const Roster = () => {
  return (
    <>
      <Paper>
        <StudentGrid />
      </Paper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Roster);
