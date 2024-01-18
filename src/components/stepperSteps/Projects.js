import React, { useState } from "react";
import ProjectForm from "./ProjectForm";
import { Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useUserContext } from "../../context/UserProvider";

export default function Projects({ id, userData, setUserData }) {
  const { projects } = useUserContext();
  const [projectForms, setProjectForms] = useState(
    projects.length
      ? projects.map((data, indx) => (
          <ProjectForm
            key={indx}
            id={indx}
            projectData={data}
            setUserData={setUserData}
            userData={userData}
          />
        ))
      : [
          <ProjectForm
            key={0}
            id={0}
            setUserData={setUserData}
            userData={userData}
          />,
        ]
  );

  const handleAddProjectForm = () => {
    const newFormKey = projectForms.length;
    setProjectForms([
      ...projectForms,
      <ProjectForm
        key={newFormKey}
        id={newFormKey}
        setUserData={setUserData}
        userData={userData}
      />,
    ]);
  };
  return (
    <Grid item xs={12}>
      {projectForms.map((form, index) => (
        <div key={index}>{form}</div>
      ))}
      <IconButton onClick={handleAddProjectForm} aria-label="Add Project">
        <AddIcon />
      </IconButton>
    </Grid>
  );
}
