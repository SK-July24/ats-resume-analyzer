import React, { useState } from "react";

const Result = ({ result, resumeFile }) => {
  const [show, setShow] = useState(false);

  if (!result) return null;

  const score = result.ats_score || 0;

  const getColor = () => {
    if (score >= 75) return "success";
    if (score >= 50) return "warning";
    return "danger";
  };

  return (
    <div>

      {/* SCORE */}
      <div className="card text-center mb-4 p-4">
        <h3>ATS Score</h3>
        <h1 className={`text-${getColor()}`}>{score}%</h1>
      </div>

      {/* BUTTON */}
      <div className="text-center mb-3">
        <button
          className="btn btn-dark"
          onClick={() => setShow(!show)}
        >
          {show ? "Hide Resume" : "Show Resume"}
        </button>
      </div>

      {/* RESUME */}
      {show && resumeFile && (
        <div className="card mb-3">

          <h5 className="text-center mt-2">Resume Preview</h5>

          <iframe
            src={resumeFile}
            width="100%"
            height="70vh"
            style={{ border: "none" }}
            title="resume"
          />

          {/* MOBILE FIX */}
          <div className="text-center p-2">
            <a href={resumeFile} target="_blank" rel="noreferrer">
              Open Resume
            </a>
          </div>

        </div>
      )}

      {/* DATA */}
      <div className="card p-3 mb-2">
        <b>Resume Skills:</b> {result.resume_skills?.join(", ")}
      </div>

      <div className="card p-3 mb-2">
        <b>Matched Skills:</b> {result.matched_skills?.join(", ")}
      </div>

      <div className="card p-3 mb-2">
        <b>Missing Skills:</b> {result.missing_skills?.join(", ")}
      </div>

      <div className="card p-3">
        <b>Suggestions:</b>
        <ul>
          {result.suggestions?.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Result;