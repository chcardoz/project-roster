import React from "react";
import Link from "next/link";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { MoveToInbox } from "@material-ui/icons";

interface CoordinatorListProps {}

const links = [
  {
    name: "Dashboard",
    link: "/",
    icon: <MoveToInbox />,
  },
  {
    name: "Students",
    link: "/roster",
    icon: <MoveToInbox />,
  },
  {
    name: "Coaches",
    link: "/coaches",
    icon: <MoveToInbox />,
  },
  {
    name: "Meetings",
    link: "/meetings",
    icon: <MoveToInbox />,
  },
];

export const CoordinatorList: React.FC<CoordinatorListProps> = ({}) => {
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
