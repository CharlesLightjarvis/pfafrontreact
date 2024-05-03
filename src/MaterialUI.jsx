import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge"; // Ensure Badge is imported
import Visites from "./Visites/Visites";
import { Link, Outlet } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import logo from "./logo.png";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import TourIcon from "@mui/icons-material/Tour";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DescriptionIcon from "@mui/icons-material/Description"; // Pour "Raisons Visites"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"; // Pour "Type Visiteurs"
import Tooltip from "@mui/material/Tooltip"; // Importer Tooltip de Material-UI
import Popover from "@mui/material/Popover";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const StyledToolbar = styled(Toolbar)({
  justifyContent: "space-between", // Space out the children of the toolbar evenly
  ".icon-container": {
    // Adding a class for the icon container
    display: "flex", // Use flexbox for layout
    alignItems: "center", // Align items vertically in the center
    gap: "5px", // Space between the icons
  },
  ".avatar": {
    cursor: "pointer",
  },
});

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openSubMenu, setOpenSubMenu] = React.useState(false);

  const [subMenuStates, setSubMenuStates] = React.useState({});
  const toggleSubMenu = (name) => {
    setSubMenuStates((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleClick = () => {
    setOpenSubMenu(!openSubMenu);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "#1D3F6E" }}>
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Access Management
          </Typography>
          <div className="icon-container">
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Avatar
                sx={{
                  bgcolor: "#D32F2F",
                  width: 30, // Taille en pixels
                  height: 30, // Taille en pixels
                  fontSize: "0.875rem", // Ajuster la taille de la police si nécessaire
                }}
                className="avatar"
              >
                P
              </Avatar>
            </IconButton>

            {/* PrimeReact initiales */}
          </div>
        </StyledToolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img
            src={logo}
            alt="Descriptive Alt Text"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "50px",
              objectFit: "cover",
            }}
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider style={{ marginTop: "10px" }} />
        <List>
          {["Dashboard", "Personnels"].map((item, index) => (
            <ListItem key={item} disablePadding>
              <ListItemButton component={Link} to={`/${item.toLowerCase()}`}>
                <ListItemIcon>
                  {item === "Dashboard" ? (
                    <DashboardIcon />
                  ) : item === "Personnels" ? (
                    <PeopleIcon />
                  ) : (
                    <EmailIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}

          {/* Gestion Visiteurs avec sous-menus */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => toggleSubMenu("gestionVisiteurs")}>
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Gestion Visiteurs" />
              {subMenuStates["gestionVisiteurs"] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse
            in={subMenuStates["gestionVisiteurs"]}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/visiteurs">
                <ListItemIcon>
                  <PeopleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Visiteurs" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                to="/typevisiteurs"
              >
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Type Visiteurs" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Gestion Visites avec sous-menus */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => toggleSubMenu("gestionVisites")}>
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Gestion Visites" />
              {subMenuStates["gestionVisites"] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse
            in={subMenuStates["gestionVisites"]}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/visites">
                <ListItemIcon>
                  <EventNoteIcon />
                </ListItemIcon>
                <ListItemText primary="Visites" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                to="/raisonvisites"
              >
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Raisons Visites" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
