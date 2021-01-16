import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { StudentTable } from "./StudentTable";

interface PopulationTabsProps {}

export const PopulationTabs: React.FC<PopulationTabsProps> = ({}) => {
  return (
    <Tabs>
      <TabList>
        <Tab>STAR</Tab>
        <Tab>SPAN</Tab>
        <Tab>Veteran</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <StudentTable />
        </TabPanel>
        <TabPanel>
          <StudentTable />
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
