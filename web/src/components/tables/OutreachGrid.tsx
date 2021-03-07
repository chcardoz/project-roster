import * as React from "react";
import { DataGrid, ColDef, CellParams, GridApi } from "@material-ui/data-grid";
import { useAllOutreachQuery, useMeQuery } from "../../generated/graphql";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import _ from "lodash";

const columns: ColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "studentID", headerName: "Student ID", width: 130 },
  { field: "coachID", headerName: "Coach ID", width: 130 },
  { field: "outreachDate", headerName: "Meeting Date", width: 120 },
  { field: "type", headerName: "Duration", width: 130 },
  {
    field: "",
    headerName: "Actions",
    sortable: false,
    width: 100,
    disableClickEventBubbling: true,
    renderCell: (params: CellParams) => {
      const onClick = () => {
        const api: GridApi = params.api;
        const fields = api
          .getAllColumns()
          .map((c) => c.field)
          .filter((c) => c !== "__check__" && !!c);
        const thisRow = {};

        fields.forEach((f) => {
          thisRow[f] = params.getValue(f);
        });

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return <Button onClick={onClick}>Click</Button>;
    },
  },
];

interface OutreachGridProps {}

const OutreachGrid: React.FC<OutreachGridProps> = () => {
  const [{ data: coachData }] = useMeQuery();
  const [{ data, fetching }] = useAllOutreachQuery({
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
  let rows = [];
  if (!fetching && !data) {
    renderBody = (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Typography>Your query failed for some reason..</Typography>
      </div>
    );
  } else if (!data && fetching) {
    renderBody = (
      <DataGrid rows={rows} columns={columns} pageSize={5} loading />
    );
  } else {
    rows = data?.allOutreach.allOutreach.map((m) => {
      return _.pick(m, ["id", "studentID", "coachID", "outreachDate", "type"]);
    });

    renderBody = <DataGrid rows={rows} columns={columns} pageSize={5} />;
  }

  return <div style={{ height: 400, width: "100%" }}>{renderBody}</div>;
};

export default OutreachGrid;
