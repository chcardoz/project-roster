import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import {
  ChevronLeft,
  ChevronRight,
  Menu as MenuIcon,
} from "@material-ui/icons";
import clsx from "clsx";
import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import Login from "../dialogs/Login";
import RecordMeeting from "../dialogs/RecordMeeting";
import { UserSettings } from "./UserSettings";
import { CoachList } from "./CoachList";
import { CoordinatorList } from "./CoordinatorList";
import { useStyles } from "../../styles/navbar";

interface NavBarProps {}

export const Navbar: React.FC<NavBarProps> = ({ children }) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let body = null;
  let list = null;
  if (!data?.currentCoach) {
    body = (
      <>
        <Button onClick={handleLoginOpen} color="inherit">
          Login
        </Button>
        <Button onClick={handleRegisterOpen} color="inherit">
          Register
        </Button>
        <Login open={loginOpen} handleClose={handleLoginClose} />
        {/* <Register open={registerOpen} handleClose={handleRegisterClose} /> */}
        <RecordMeeting open={registerOpen} handleClose={handleRegisterClose} />
      </>
    );
    list = <CoachList />;
  } else {
    body = <UserSettings />;
    if (data?.currentCoach.isCoordinator) {
      list = <CoordinatorList />;
    } else {
      list = <CoachList />;
    }
  }

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            Roster management
          </Typography>
          {body}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        {list}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </>
  );
};
