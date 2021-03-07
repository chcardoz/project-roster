import React from "react";
import Link from "next/link";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { MoveToInbox } from "@material-ui/icons";

interface CoachListProps {}

const links = [
  {
    name: "Dashboard",
    link: "/",
    icon: <MoveToInbox />,
  },
  {
    name: "Roster",
    link: "/roster",
    icon: <MoveToInbox />,
  },
  {
    name: "Meetings",
    link: "/meetings",
    icon: <MoveToInbox />,
  },
  {
    name: "Outreach",
    link: "/outreach",
    icon: <MoveToInbox />,
  },
];

export const CoachList: React.FC<CoachListProps> = ({}) => {
  return (
    <List>
      {links.map((link) => (
        <ListItem button key={link.name}>
          <ListItemIcon>{link.icon}</ListItemIcon>
          <Link href={link.link}>
            <ListItemText primary={link.name} />
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
