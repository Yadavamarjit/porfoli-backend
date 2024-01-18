import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import BasicInfo from "../stepperSteps/BasicInfo";
import Journey from "../stepperSteps/Journey";
import Projects from "../stepperSteps/Projects";
import axios from "axios";
import { Slide } from "@mui/material";
import { useUserContext } from "../../context/UserProvider";

export function VerticalStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    profession: "",
    heading: "",
    subHeader: "",
    techStacks: [],
    overView: "",
    profilePic: "",
  });
  const [formUpdated, setformUpdated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    console.log(formUpdated);
  }, [formUpdated]);
  const steps = [
    {
      label: "Enter your Basic Informations",
      element: (
        <BasicInfo
          userData={userData}
          setUserData={setUserData}
          handleChange={handleChange}
          formUpdated={formUpdated}
          setformUpdated={setformUpdated}
        />
      ),
    },
    {
      label: "Share your Journey",
      element: (
        <Journey
          userData={userData}
          setUserData={setUserData}
          handleChange={handleChange}
        />
      ),
    },
    {
      label: "Add your projects",
      element: (
        <Projects
          userData={userData}
          setUserData={setUserData}
          handleChange={handleChange}
        />
      ),
    },
  ];

  const updateUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      // Make the API call to update user data with the updated userData
      const res = await axios.put("http://localhost:5000/basicinfo", userData, {
        headers,
      });
      setformUpdated(false);
      console.log("User data updated successfully!", res.data);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  const handleNext = () => {
    if (activeStep == 0 && formUpdated) updateUserProfile();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    // <Slide className="edit-container" direction="left" in={true}>
    <Box className="edit-container">
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.element}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
    // </Slide>
  );
}
