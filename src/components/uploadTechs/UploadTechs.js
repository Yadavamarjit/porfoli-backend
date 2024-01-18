import React, { useEffect, useState } from "react";
import FileUpload from "../upload/Upload";
import { fetch } from "../../utils/fetch";
import { TextField, Typography } from "@mui/material";
import "./UploadTechs.css";

export default function UploadTechs() {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await fetch("GET", "techs/all");
      setTechs(data);
      setLoading(false);
    })();
  }, []);

  const disableUpload = () => {
    const indx = techs.findIndex((techData) => techData.name === name);
    if (indx > -1 || !name) return true;
  };

  const getUploadedTech = async () => {
    console.log("getting", name);
    const res = await fetch("GET", "techs/get/" + name);
    setTechs([...techs, ...res]);
    setName("");
  };

  return (
    <div className="tech-upload-container">
      <div className="tech-upload-section">
        <FileUpload
          label={"Add a technology "}
          input={name}
          disable={() => disableUpload()}
          callBack={getUploadedTech}
        >
          <TextField
            className="tech-name-input"
            placeholder="What's it's name"
            value={name}
            onChange={handleNameChange}
            variant="outlined"
            margin="normal"
          />
        </FileUpload>
      </div>
      <div className="tech-cards-container">
        {!loading &&
          techs.map((tech) => (
            <div className="tech-card">
              <img src={tech.img} />
              <Typography>{tech.name}</Typography>
            </div>
          ))}
      </div>
    </div>
  );
}
