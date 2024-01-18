import React from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EditIcon from "@mui/icons-material/Edit";
import ReorderIcon from "@mui/icons-material/Reorder";
import { VerticalStepper } from "../stepper/Stepper";

const HomePage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", height: 224 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab icon={<DashboardIcon />} />
        <Tab icon={<EditIcon />} />
        <Tab icon={<ReorderIcon />} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography>Content for Dashboard</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VerticalStepper />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>Content for Reorder</Typography>
      </TabPanel>
    </Box>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default HomePage;
