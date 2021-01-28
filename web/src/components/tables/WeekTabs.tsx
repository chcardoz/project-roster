import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { MeetingTable } from "./MeetingTable";
import { OutreachTable } from "./OutreachTable";

export type WeekTabVariant = "meeting" | "outreach";
interface WeekTabsProps {
  variant?: WeekTabVariant;
}

export const WeekTabs: React.FC<WeekTabsProps> = ({ variant = "meeting" }) => {
  let Table = MeetingTable;
  if (variant === "outreach") {
    Table = OutreachTable;
  }
  return (
    <Tabs>
      <TabList>
        <Tab>Week 1</Tab>
        <Tab>Week 2</Tab>
        <Tab>Week 3</Tab>
        <Tab>Week 4</Tab>
        <Tab>Week 5</Tab>
        <Tab>Week 6</Tab>
        <Tab>Week 7</Tab>
        <Tab>Week 8</Tab>
        <Tab>Week 9</Tab>
        <Tab>Week 10</Tab>
        <Tab>Week 11</Tab>
        <Tab>Week 12</Tab>
        <Tab>Week 13</Tab>
        <Tab>Week 14</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Table week="1" />
        </TabPanel>
        <TabPanel>
          <Table week="2" />
        </TabPanel>
        <TabPanel>
          <Table week="3" />
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
