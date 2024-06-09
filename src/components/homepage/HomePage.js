import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EditIcon from "@mui/icons-material/Edit";
import ReorderIcon from "@mui/icons-material/Reorder";
import { VerticalStepper } from "../stepper/VerticalStepper";
import { Email, Visibility } from "@mui/icons-material";
import Mails from "../Mails/Mails";
import { useUserContext } from "../../context/UserProvider";
import { useEffect } from "react";
import Visitor from "../visitors/Visitor";
import Dashboard from "../DashBoard/Dashboard";
import { useNavigate } from "react-router-dom";

const drawerWidth = 200;

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

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

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

export default function HomePage() {
  const { messages, getBasicInfo } = useUserContext();
  const [open, setOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState("Dashboard");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    getBasicInfo();
  }, []);

  const componentMap = {
    Dashboard: {
      component: Dashboard,
      props: {
        /* Dashboard-specific props go here */
      },
    },
    Emails: {
      component: Mails,
      props: {
        type: "msg",
        data: messages,
      },
    },
    Edit: {
      component: VerticalStepper,
      props: {
        /* Edit-specific props go here */
      },
    },
    Reorder: {
      component: ReorderComponent,
      props: {
        /* Reorder-specific props go here */
      },
    },
    Visitors: {
      component: Visitor,
      props: {},
    },
  };
  const tabs = [
    {
      icon: <DashboardIcon />,
      label: "Dashboard",
    },
    {
      icon: <Email />,
      label: "Emails",
    },
    {
      icon: <EditIcon />,
      label: "Edit",
    },
    {
      icon: <ReorderIcon />,
      label: "Reorder",
    },
    {
      icon: <Visibility />,
      label: "Visitors",
    },
  ];

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {tabs.map((tab) => (
            <ListItem key={tab.label} disablePadding sx={{ display: "block" }}>
              <ListItemButton onClick={() => setSelectedTab(tab.label)}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {tab.icon}
                </ListItemIcon>
                <ListItemText
                  primary={tab.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* <VerticalStepper /> */}
        {React.createElement(
          componentMap[selectedTab].component,
          componentMap[selectedTab].props
        )}
      </Box>
    </Box>
  );
}

function ReorderComponent() {
  return <div>Reorder Component</div>;
}
