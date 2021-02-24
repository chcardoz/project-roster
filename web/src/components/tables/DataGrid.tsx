import * as React from "react";
import { DataGrid, ColDef, ValueGetterParams } from "@material-ui/data-grid";
import { useState } from "react";
import { useAllMeetingsQuery, useMeQuery } from "../../generated/graphql";
import { Typography } from "@material-ui/core";
import _ from "lodash";

const columns: ColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: ValueGetterParams) =>
      `${params.getValue("firstName") || ""} ${
        params.getValue("lastName") || ""
      }`,
  },
];

interface MeetingGridProps {
  week: number;
}

const DataGridDemo: React.FC<MeetingGridProps> = ({ week }) => {
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: null as null | string,
  });
  const [{ data: coachData }] = useMeQuery();
  const [{ data, fetching }] = useAllMeetingsQuery({
    variables: {
      week,
      options: {
        ...variables,
        coachID:
          coachData?.currentCoach === null ? null : coachData?.currentCoach.id,
        isCoordinator:
          coachData?.currentCoach === null
            ? null
            : coachData?.currentCoach.isCoordinator,
      },
    },
  });

  let renderBody = null;
  let rows = null;
  let columns = null;
  if (!fetching && !data) {
    renderBody = <Typography>Your query failed for some reason</Typography>;
  } else if (!data && fetching) {
    renderBody = <Typography>Loading ...</Typography>;
  } else {
    rows = _.pick(data?.allMeetings.allMeetings, [
      "studentID",
      "coachID",
      "meetingDate",
      "duration",
    ]);
    renderBody = <DataGrid rows={rows} columns={columns} pageSize={10} />;
  }

  return <div style={{ height: 500, width: "100%" }}>{renderBody}</div>;
};

export default DataGridDemo;
