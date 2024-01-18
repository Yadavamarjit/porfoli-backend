import React, { useState } from "react";
import axios from "axios";
import { Button, Grid, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./Upload.css";
import { DeleteForever } from "@mui/icons-material";

const FileUpload = ({
  label,
  input,
  Icon,
  callBack,
  imgFor,
  id,
  disable,
  children,
}) => {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  // console.log({ disable });
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const deleteImg = () => {
    setFile(null);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      input && formData.append("name", input);
      id && formData.append("id", id);
      imgFor && formData.append("id", imgFor);
      formData.append("key", localStorage.getItem("email"));

      const res = await axios.post(
        `http://localhost:5000/${input !== undefined ? "upload" : "userFile"}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      callBack && callBack(res.data.img);
      input && setFile("");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  return (
    <div className="file-upload-container">
      {!file && (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <Button
              className="btn-primary"
              variant="contained"
              component="span"
              // startIcon={<Icon />}
            >
              {label ?? "Upload Image"}
            </Button>
          </label>
        </>
      )}

      {file && (
        <div className="uploadfile-preview-card">
          <Grid className="card-img-container">
            <img src={previewURL} />
          </Grid>

          <Grid
            container
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"0 15px"}
          >
            {children}
            <Button
              variant="contained"
              className="btn-primary"
              startIcon={<CloudUploadIcon />}
              onClick={handleFileUpload}
              fullWidth
              disabled={disable()}
            >
              Upload
            </Button>
            <Button
              variant="contained"
              className="btn-err"
              startIcon={<DeleteForever className="uploadfile-delete-btn" />}
              onClick={deleteImg}
              fullWidth
            >
              Delete
            </Button>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
