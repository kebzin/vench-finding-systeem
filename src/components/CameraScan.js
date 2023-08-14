// src/components/CameraCapture.js
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const CameraCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const videoConstraints = {
    facingMode: "enviroment",
  };
  const [url, setURL] = useState(null);

  const captureImage = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setURL(imageSrc);
  }, [webcamRef]);
  const onUserMedia = (event) => {
    console.log("on user media", event);
  };
  return (
    <div>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
        mirrored={true}
      />
      <button onClick={captureImage}>Capture Image</button>
      <button onClick={() => setURL(null)}></button>
      {url && <img src={url} alt="screen shot" />}
    </div>
  );
};

export default CameraCapture;
