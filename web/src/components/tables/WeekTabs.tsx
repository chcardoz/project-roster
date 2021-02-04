import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { MeetingTable } from "./MeetingTable";
import { OutreachTable } from "./OutreachTable";

export type WeekTabVariant = "meeting" | "outreach";
interface WeekTabsProps {
  variant?: WeekTabVariant;
}

export const WeekTabs: React.FC<WeekTabsProps> = ({ variant = "meeting" }) => {
  const tabs = [];
  const tabpanels = [];
  const MAXWEEKS = 14;
  let Table = MeetingTable;
  if (variant === "outreach") {
    Table = OutreachTable;
  }
  for (let i = 1; i <= MAXWEEKS; i++) {
    tabs.push(<Tab>Wk {i}</Tab>);
    tabpanels.push(
      <TabPanel>
        <Table week={i} />
      </TabPanel>
    );
  }
  return (
    <Tabs isLazy isFitted>
      <TabList>{tabs}</TabList>

      <TabPanels>{tabpanels}</TabPanels>
    </Tabs>
  );
};
