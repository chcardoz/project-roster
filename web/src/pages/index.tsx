import { Paper } from "@material-ui/core";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { withUrqlClient } from "next-urql";
import React from "react";
import StudentGrid from "../components/tables/StudentGrid";
import { createUrqlClient } from "../utils/createUrqlClient";
import { data } from "./data";

const Index = () => {
  return (
    <Paper style={{ width: "65%", height: "600px" }}>
      <ResponsiveScatterPlot
        data={[]}
        margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        xScale={{ type: "linear", min: 0, max: "auto" }}
        xFormat={function (e) {
          return e + " kg";
        }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        yFormat={function (e) {
          return e + " cm";
        }}
        colors={{ scheme: "category10" }}
        blendMode="multiply"
        nodeSize={13}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "weight",
          legendPosition: "middle",
          legendOffset: 46,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "size",
          legendPosition: "middle",
          legendOffset: -60,
        }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 130,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 12,
            itemsSpacing: 5,
            itemDirection: "left-to-right",
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Paper>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
