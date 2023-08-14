// src/components/NumberPlateRecognition.js
import React, { useState } from "react";
import Tesseract from "tesseract.js";

const NumberPlateRecognition = ({ imageSrc }) => {
  const [numberPlate, setNumberPlate] = useState("");

  const recognizeNumberPlate = async () => {
    const result = await Tesseract.recognize(imageSrc, "eng");
    setNumberPlate(result.data.text);
  };

  return (
    <div>
      <img src={imageSrc} alt="Captured Vehicle" />
      <button onClick={recognizeNumberPlate}>Recognize Number Plate</button>
      <p>Number Plate: {numberPlate}</p>
    </div>
  );
};

export default NumberPlateRecognition;
