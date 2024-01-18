import { Grid, TextField, Typography, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import WorkExperienceForm from "./WorkExperienceForm";
import AddIcon from "@mui/icons-material/Add";
import { useUserContext } from "../../context/UserProvider";

export default function Journey({ handleChange, setUserData, userData }) {
  const { experiences } = useUserContext();
  const [workExperienceForms, setWorkExperienceForms] = useState(
    experiences?.length
      ? experiences.map((data, indx) => (
          <WorkExperienceForm
            key={indx}
            id={indx}
            experienceData={data}
            setUserData={setUserData}
            userData={userData}
          />
        ))
      : [
          <WorkExperienceForm
            key={0}
            id={0}
            setUserData={setUserData}
            userData={userData}
          />,
        ]
  );

  const handleAddForm = () => {
    const newFormKey = workExperienceForms.length;
    setWorkExperienceForms([
      ...workExperienceForms,
      <WorkExperienceForm
        key={newFormKey}
        id={newFormKey}
        setUserData={setUserData}
        userData={userData}
      />,
    ]);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {workExperienceForms.map((form, index) => (
          <div key={index}>{form}</div>
        ))}
        <IconButton onClick={handleAddForm} aria-label="Add Work Experience">
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
