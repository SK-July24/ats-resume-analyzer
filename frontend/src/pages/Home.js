import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import Result from "../components/Result";
import "../App.css"; // make sure this is imported

const Home = () => {
  const [result, setResult] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  return (
    <>
      {/* 🔥 Moving Image Background */}
      <div className="bg-image"></div>

      <div style={{ minHeight: "100vh", padding: "30px" }}>
        <div className="container">

          {/* HEADER */}
          <div className="text-center mb-4">
            <h1 style={{ fontWeight: "700", color: "#fff" }}>
              ATS Resume Analyzer
            </h1>
            <p style={{ color: "#ddd" }}>
              Upload resume and get instant ATS score + feedback
            </p>
          </div>

          {/* UPLOAD */}
          <UploadForm
            setResult={setResult}
            setResumeFile={setResumeFile}
          />

          {/* RESULT */}
          <Result
            result={result}
            resumeFile={resumeFile}
          />

        </div>
      </div>
    </>
  );
};

export default Home;