import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import Result from "../components/Result";

const Home = () => {
  const [result, setResult] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh", padding: "30px" }}>
      <div className="container">

        {/* HEADER */}
        <div className="text-center mb-4">
          <h1 style={{ fontWeight: "700" }}>ATS Resume Analyzer</h1>
          <p style={{ color: "#6c757d" }}>
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
  );
};

export default Home;