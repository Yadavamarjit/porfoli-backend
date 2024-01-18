import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Typography,
  TextareaAutosize,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileUpload from "../upload/Upload";
import axios from "axios";

const WorkExperienceForm = ({ id, userData, setUserData, experienceData }) => {
  const [formData, setFormData] = useState({
    role: "",
    companyName: "",
    companyLogo: "",
    roleDetails: "",
    joiningDate: "",
    lastDate: "",
    id,
  });
  const [disableLastDay, setDisableLastDay] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [expand, setExpand] = useState(id == 0 ?? false);
  const [formUpdated, setformUpdated] = useState(false);

  const handleInputChange = (event) => {
    setformUpdated(true);
    const { name, value } = event.target;
    const newValue =
      name === "roleDetails" ? value.replace(/\n/g, "<br>") : value;

    setFormData({ ...formData, [name]: newValue });
  };

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Check if required fields have values
    console.log(formData);
    const requiredFields = [
      "role",
      "companyName",
      "roleDetails",
      "joiningDate",
    ];
    const isAllRequiredFieldsFilled = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );

    setIsFormValid(isAllRequiredFieldsFilled && formUpdated);
  }, [formData]);

  useEffect(() => {
    console.log(experienceData);
    experienceData && setFormData({ ...experienceData });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tempExperience = formData;

    try {
      const response = await axios.post(
        "http://localhost:5000/experience",
        {
          experience: formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setUserData((prev) => ({ ...prev, experience: tempExperience }));
        setformUpdated(false);
      }
    } catch (error) {
      console.error("Error updating experience:", error);
    }
  };

  const urlCallBack = (url) => {
    setformUpdated(true);
    setFormData({ ...formData, companyLogo: url });
  };

  useEffect(() => {
    console.log("--------", formData.companyLogo);
  }, [formData]);

  const handleCheckBox = () => {
    setformUpdated(true);
    setFormData({ ...formData, lastDate: "" });
    setDisableLastDay(!disableLastDay);
  };

  return (
    <Accordion expanded={expand}>
      <AccordionSummary
        onClick={() => setExpand(!expand)}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>Work Experience</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            className="form-input"
            placeholder="Position"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            className="form-input"
            name="companyName"
            placeholder="Company name"
            value={formData.companyName}
            onChange={handleInputChange}
            fullWidth
            inputprops={{ maxLength: 20 }}
            required
          />
          <FileUpload label={"Upload company logo"} callBack={urlCallBack} />
          <TextareaAutosize
            name="roleDetails"
            placeholder="Explain about your role"
            value={formData.roleDetails}
            onChange={handleInputChange}
            minRows={3}
            inputprops={{ maxLength: 500 }}
            required
            style={{ width: "99%" }}
          />

          <TextField
            className="form-input"
            name="joiningDate"
            type="date"
            value={formData.joiningDate}
            onChange={handleInputChange}
            fullWidth
            required
            inputprops={{ max: today }}
          />
          <TextField
            className="form-input"
            name="lastDate"
            type="date"
            value={formData.lastDate}
            onChange={handleInputChange}
            fullWidth
            disabled={disableLastDay}
            inputprops={{ max: today }}
          />
          <Grid>
            <FormControlLabel
              control={<Checkbox onClick={handleCheckBox} />}
              label="I'm currently working here"
            />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default WorkExperienceForm;
