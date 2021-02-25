import * as React from "react";
import { DataGrid, ColDef } from "@material-ui/data-grid";
import { useAllStudentsQuery, useMeQuery } from "../../generated/graphql";
import { CircularProgress, Typography } from "@material-ui/core";
import _ from "lodash";

const columns: ColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "email", headerName: "Email", width: 120 },
  { field: "population", headerName: "Population", width: 130 },
  { field: "meetingFrequency", headerName: "Meeting Frequency", width: 130 },
  { field: "modeOfMeeting", headerName: "Mode of Meeting", width: 130 },
];

interface StudentGridProps {}

const StudentGrid: React.FC<StudentGridProps> = () => {
  const [{ data: coachData }] = useMeQuery();
  const [{ data, fetching }] = useAllStudentsQuery({
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
    renderBody = (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Typography>Your query failed for some reason..</Typography>
      </div>
    );
  } else if (!data && fetching) {
    renderBody = (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <CircularProgress />
      </div>
    );
  } else {
    rows = data?.allStudents.allStudents.map((m) => {
      return _.pick(m, [
        "id",
        "firstName",
        "lastName",
        "email",
        "population",
        "meetingFrequency",
        "modeOfMeeting",
      ]);
    });

    renderBody = <DataGrid rows={rows} columns={columns} pageSize={5} />;
  }

  return <div style={{ height: 400, width: "100%" }}>{renderBody}</div>;
};

export default StudentGrid;
