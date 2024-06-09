import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileUpload from "../upload/Upload";
import axios from "axios";
import { InputWithChips } from "../inputWithChips/InputWithChips";

const ProjectForm = ({ id, userData, setUserData, projectData }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    techs: [],
    img: null,
    id,
  });
  const [expand, setExpand] = useState(id == 0 ?? false);
  const [formUpdated, setformUpdated] = useState(false);

  const handleChange = (event) => {
    setformUpdated(true);
    const { name, value } = event.target;

    const newValue =
      name === "description" ? value.replace(/\n/g, "<br>") : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "techs" ? prevData.techs : newValue,
    }));
  };
  const handleTechStacksChange = (chips) => {
    setformUpdated(true);
    setFormData((prevFormData) => ({
      ...prevFormData,
      techs: chips,
    }));
  };

  const isFormValid = () => {
    const { projectName, description, techs } = formData;
    return (
      projectName?.trim() !== "" &&
      description?.trim() !== "" &&
      techs.length > 0 &&
      formUpdated
    );
  };
  useEffect(() => {
    projectData && setFormData({ ...projectData });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      console.log("Please fill in all required fields");
      return;
    }
    console.log("Form submitted:", formData);

    try {
      const response = await axios.post(
        process.env.REACT_APP_ADMIN_API + "/projects",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("API response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const urlCallBack = (url) => {
    setFormData({ ...formData, img: url });
  };
  return (
    <Accordion expanded={expand}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={() => setExpand(!expand)}
      >
        <Typography>Project Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className="form-input"
                placeholder="Project name"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                className="form-input"
                placeholder="Project description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                minRows={3}
                maxLength={400}
              />
            </Grid>
            <Grid item xs={12}>
              <FileUpload
                label={"Upload project image"}
                callBack={urlCallBack}
              />
            </Grid>
            <Grid item xs={12}>
              <InputWithChips
                customClass="project-techstack"
                onChange={handleTechStacksChange}
                selected={projectData?.techs}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                disabled={!isFormValid()}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProjectForm;
