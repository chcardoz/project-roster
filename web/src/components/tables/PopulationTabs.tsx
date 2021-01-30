import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { StudentTable } from "./StudentTable";

interface PopulationTabsProps {}

export const PopulationTabs: React.FC<PopulationTabsProps> = ({}) => {
  return (
    <Tabs isLazy>
      <TabList>
        <Tab>STAR</Tab>
        <Tab>SPAN</Tab>
        <Tab>Veteran</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <StudentTable population="star" />
        </TabPanel>
        <TabPanel>
          <StudentTable population="span" />
        </TabPanel>
        <TabPanel>
          <StudentTable population="veteran" />
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
