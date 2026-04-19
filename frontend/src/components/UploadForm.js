import React, { useState } from "react";
import axios from "axios";

const UploadForm = ({ setResult, setResumeFile }) => {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded);

    const url = URL.createObjectURL(uploaded);
    setResumeFile(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jd);

    try {
      const res = await axios.post(
        "https://your-app.onrender.com/analyze",
        formData
      );

      setResult(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card shadow-lg border-0 p-4 mb-4"
         style={{ borderRadius: "15px" }}>

      <h4 className="mb-3">Upload Resume</h4>

      <input
        type="file"
        className="form-control mb-3"
        onChange={handleFileChange}
      />

      <textarea
        className="form-control mb-3"
        rows="5"
        placeholder="Paste Job Description"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />

      <button
        className="btn btn-primary w-100"
        style={{
          borderRadius: "10px",
          fontWeight: "600",
          padding: "10px"
        }}
        onClick={handleSubmit}
      >
        Analyze Resume
      </button>

    </div>
  );
};

export default UploadForm;