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

  // ✅ Added mobile check
  const isMobile = window.innerWidth < 768;

  return (
    <div>

      {/* SCORE CARD */}
      <div className="card shadow border-0 text-center mb-4"
           style={{ borderRadius: "15px", padding: "25px" }}>

        <h3>ATS Score</h3>

        <h1 className={`text-${getColor()}`}
            style={{ fontSize: "50px", fontWeight: "700" }}>
          {score}%
        </h1>

        <div className="progress"
             style={{ height: "10px", borderRadius: "10px" }}>
          <div
            className={`progress-bar bg-${getColor()}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* BUTTON */}
      <div className="text-center mb-3">
        <button
          className="btn btn-dark"
          style={{ borderRadius: "10px", padding: "8px 20px" }}
          onClick={() => setShow(!show)}
        >
          {show ? "Hide Resume" : "Show Resume"}
        </button>
      </div>

      {/* RESUME PREVIEW */}
      {show && resumeFile && (
        <div className="card shadow border-0 mb-3"
             style={{ borderRadius: "15px", overflow: "hidden" }}>

          <div className="p-2">
            <h5 className="text-center">Resume Preview</h5>
          </div>

          {/* ✅ Changed logic here */}
          {isMobile ? (
            <div className="text-center p-3">
              <a
                href={resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Open Resume
              </a>
            </div>
          ) : (
            <iframe
              src={resumeFile}
              width="100%"
              height="600px"
              style={{ border: "none" }}
              title="resume"
            />
          )}
        </div>
      )}

      {/* SKILLS */}
      <div className="card shadow-sm border-0 mb-3"
           style={{ borderRadius: "12px", padding: "15px" }}>
        <b>Resume Skills:</b> {result.resume_skills?.join(", ")}
      </div>

      <div className="card shadow-sm border-0 mb-3"
           style={{ borderRadius: "12px", padding: "15px" }}>
        <b>Matched Skills:</b> {result.matched_skills?.join(", ")}
      </div>

      <div className="card shadow-sm border-0 mb-3"
           style={{ borderRadius: "12px", padding: "15px" }}>
        <b>Missing Skills:</b> {result.missing_skills?.join(", ")}
      </div>

      <div className="card shadow-sm border-0 mb-3"
           style={{ borderRadius: "12px", padding: "15px" }}>
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