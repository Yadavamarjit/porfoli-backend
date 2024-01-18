import React, { useEffect, useState } from "react";
import { Grid, TextField, TextareaAutosize, Typography } from "@mui/material";
import { InputWithChips } from "../inputWithChips/InputWithChips";
import FileUpload from "../upload/Upload";
import { useUserContext } from "../../context/UserProvider";

const BasicInfo = ({ userData, setUserData, formUpdated, setformUpdated }) => {
  const { basicInfo } = useUserContext();

  const handleChange = (event) => {
    const { name, value } = event.target;

    const newValue =
      name === "subHeader" || name === "overView"
        ? value.replace(/\n/g, "<br>")
        : value;

    setformUpdated(true);
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: newValue,
    }));
  };

  const handleTechStacksChange = (chips) => {
    setformUpdated(true);
    setUserData((prevUserData) => ({
      ...prevUserData,
      techStacks: chips,
    }));
  };

  const updateProfilePic = (url) => {
    setformUpdated(true);
    setUserData((prevUserData) => ({
      ...prevUserData,
      profilePic: url,
    }));
  };

  useEffect(() => {
    console.log({ basicInfo });
    setUserData({ userData, ...basicInfo });
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          name="name"
          inputprops={{ maxLength: 50 }}
          value={userData.name}
          onChange={handleChange}
          className="form-input"
          placeholder="What's your name"
          fullWidth
        />
      </Grid>
      <Grid>
        <FileUpload
          callBack={updateProfilePic}
          label={"Upload a profile Picture"}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="profession"
          inputprops={{ maxLength: 50 }}
          value={userData.profession}
          onChange={handleChange}
          className="form-input"
          placeholder="What's your profession"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="heading"
          inputprops={{ maxLength: 50 }}
          value={userData.heading}
          onChange={handleChange}
          className="form-input"
          placeholder="Enter Header for your page"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextareaAutosize
          name="subHeader"
          minRows={2}
          value={userData.subHeader}
          onChange={handleChange}
          placeholder="I like to work on...."
        />
      </Grid>
      <Grid item xs={12} className="textarea-container">
        <TextareaAutosize
          placeholder="I'm a skilled software developer with experience in TypeScript and JavaScript ...."
          inputprops={{ maxLength: 700 }}
          value={userData.overView}
          onChange={handleChange}
          name="overView"
          className="centered-textarea"
          minRows={3}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography>What are your Tech Stacks</Typography>
        <InputWithChips
          onChange={handleTechStacksChange}
          selected={userData.techStacks}
        />
      </Grid>
    </Grid>
  );
};

export default BasicInfo;
