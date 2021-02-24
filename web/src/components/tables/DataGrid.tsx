import * as React from "react";
import { DataGrid, ColDef } from "@material-ui/data-grid";
import { useAllMeetingsQuery, useMeQuery } from "../../generated/graphql";
import { Typography } from "@material-ui/core";
import _ from "lodash";

const columns: ColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "studentID", headerName: "Student ID", width: 130 },
  { field: "coachID", headerName: "Coach ID", width: 130 },
  { field: "meetingDate", headerName: "Meeting Date", width: 120 },
  { field: "duration", headerName: "Duration", width: 130 },
];

interface MeetingGridProps {}

const DataGridDemo: React.FC<MeetingGridProps> = () => {
  const [{ data: coachData }] = useMeQuery();
  const [{ data, fetching }] = useAllMeetingsQuery({
    variables: {
      options: {
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
  if (!fetching && !data) {
    renderBody = <Typography>Your query failed for some reason</Typography>;
  } else if (!data && fetching) {
    renderBody = <Typography>Loading ...</Typography>;
  } else {
    rows = data?.allMeetings.allMeetings.map((m) => {
      return _.pick(m, [
        "id",
        "studentID",
        "coachID",
        "meetingDate",
        "duration",
      ]);
    });
    if (rows.length == null) {
      renderBody = <Typography>You have no students</Typography>;
    } else {
      renderBody = <DataGrid rows={rows} columns={columns} pageSize={5} />;
    }
  }

  return <div style={{ height: 400, width: "100%" }}>{renderBody}</div>;
};

export default DataGridDemo;
