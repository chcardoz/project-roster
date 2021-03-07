import { Paper } from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import OutreachGrid from "../components/tables/OutreachGrid";
import { createUrqlClient } from "../utils/createUrqlClient";

const Outreach = () => {
  return (
    <Paper>
      <OutreachGrid />
    </Paper>
  );
};

export default withUrqlClient(createUrqlClient)(Outreach);
