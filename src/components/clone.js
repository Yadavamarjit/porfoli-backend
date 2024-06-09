import React, { useState } from "react";
import axios from "axios";

const FaceSwapApp = () => {
  const [imageA, setImageA] = useState(null);
  const [imageB, setImageB] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleImageAChange = (event) => {
    const file = event.target.files[0];
    setImageA(file);
  };

  const handleImageBChange = (event) => {
    const file = event.target.files[0];
    setImageB(file);
  };

  const handleProcessImages = async () => {
    if (!imageA || !imageB) {
      alert("Please select both images.");
      return;
    }

    const formData = new FormData();
    formData.append("imageA", imageA);
    formData.append("imageB", imageB);

    try {
      const response = await axios.post(
        "http://localhost:5000/process-images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProcessedImage(response.data.processed_image);
    } catch (error) {
      console.error("Error processing images:", error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:5000/download", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "processed_image.jpg");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading processed image:", error);
    }
  };

  return (
    <div>
      <h1>Face Swap App</h1>

      <input type="file" accept="image/*" onChange={handleImageAChange} />
      <input type="file" accept="image/*" onChange={handleImageBChange} />

      <button onClick={handleProcessImages}>Process Images</button>

      {processedImage && (
        <div>
          <img
            src={`http://localhost:5000/${processedImage}`}
            alt="Processed"
          />
          <button onClick={handleDownload}>Download Processed Image</button>
        </div>
      )}
    </div>
  );
};

export default FaceSwapApp;
