import React from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { TabPanel } from "./TabPanel";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minWidth: 500,
  },
}));

interface PopulationTabsProps {}

export const PopulationTabs: React.FC<PopulationTabsProps> = ({}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const populations = ["STAR", "SPAN", "special", "Voluntary"];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {populations.map((p) => {
            return <Tab label={p} {...a11yProps(populations.indexOf(p))} />;
          })}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {populations.map((p) => {
          return (
            <TabPanel
              value={value}
              index={populations.indexOf(p)}
              dir={theme.direction}
            >
              {p.toLowerCase()}
            </TabPanel>
          );
        })}
      </SwipeableViews>
    </div>
  );
};
