import React, { useState } from "react";

const Result = ({ result, resumeFile }) => {
  const [show, setShow] = useState(false);

  if (!result) return null;

  const score = result.ats_score || 0;

  const getColor = () => {
    if (score >= 75) return "#22c55e";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const getMessage = () => {
    if (score >= 75) return "Awesome! You're crushing it 🎉";
    if (score >= 50) return "Keep improving 💪";
    return "Let's fix this together 🚀";
  };

  // ✅ AI Suggestions
  const generateAISuggestions = () => {
    const suggestions = [];

    if (score < 50) {
      suggestions.push("Your resume is not aligned with the job description. Improve core skills and keywords.");
    }

    if (score >= 50 && score < 75) {
      suggestions.push("Good progress. Improve keyword matching and structure.");
    }

    if (score >= 75) {
      suggestions.push("Strong profile! Add measurable achievements to stand out.");
    }

    if (result.missing_skills?.length > 0) {
      suggestions.push(
        `Consider adding skills like ${result.missing_skills
          .slice(0, 3)
          .join(", ")}.`
      );
    }

    if (result.matched_skills?.length > 5) {
      suggestions.push(
        "Highlight your matched skills clearly in your experience section."
      );
    }

    suggestions.push(
      "Use strong action verbs like 'Developed', 'Built', 'Optimized'."
    );

    return suggestions;
  };

  const aiSuggestions = generateAISuggestions();

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
        display: "flex",
        gap: "30px",
        alignItems: "stretch",
        flexWrap: "wrap",
      }}
    >
      {/* LEFT BOX */}
      <div
        style={{
          flex: "1 1 350px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* SCORE */}
        <div
          style={{
            backdropFilter: "blur(12px)",
            background: "#fff",
            borderRadius: "20px",
            padding: "40px",
            textAlign: "center",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h4 style={{ color: "#555", marginBottom: "10px" }}>
            ATS Score
          </h4>

          <h1
            style={{
              fontSize: "64px",
              fontWeight: "700",
              color: getColor(),
            }}
          >
            {score}%
          </h1>

          <p style={{ color: "#777", marginTop: "10px" }}>
            {getMessage()}
          </p>

          <button
            onClick={() => setShow(!show)}
            style={{
              marginTop: "20px",
              background: "#52ea54",
              color: "black",
              border: "none",
              padding: "12px 28px",
              borderRadius: "30px",
              cursor: "pointer",
              fontSize: "14px",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) =>
              (e.target.style.transform = "scale(1)")
            }
          >
            {show ? "Hide Resume" : "View Resume"}
          </button>
        </div>

        {/* RESUME */}
        {show && resumeFile && (
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "15px",
              boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
            }}
          >
            <h5 style={{ textAlign: "center", marginBottom: "10px" }}>
              Resume Preview
            </h5>

            <iframe
              src={resumeFile}
              width="100%"
              height="400px"
              style={{ border: "none", borderRadius: "10px" }}
              title="resume"
            />

            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <a href={resumeFile} target="_blank" rel="noreferrer">
                Open Full Resume
              </a>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT BOX */}
      <div
        style={{
          flex: "1 1 350px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* DATA CARDS */}
        {[
          {
            title: "Resume Skills :",
            data: result.resume_skills,
            color: "#3b82f6",
          },
          {
            title: "Matched Skills :",
            data: result.matched_skills,
            color: "#22c55e",
          },
          {
            title: "Missing Skills :",
            data: result.missing_skills,
            color: "#ef4444",
          },
        ].map((section, idx) => (
          <div
            key={idx}
            style={{
              background: "#e8eddf",
              borderRadius: "16px",
              padding: "22px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
            }}
          >
            <h5 style={{ marginBottom: "10px", color: section.color }}>
              {section.title}
            </h5>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {section.data?.map((item, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    margin: "5px",
                    borderRadius: "999px",
                    background: `${section.color}15`,
                    color: "#000",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* ✅ AI SUGGESTIONS ONLY */}
        <div
          style={{
            background: "#f0fdf4",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
            border: "1px solid #bbf7d0",
          }}
        >
          <h5 style={{ color: "#ffca3a" }}>Suggestions :</h5>

          <ul style={{ marginTop: "10px",color: "#000" }}>
            {aiSuggestions.map((s, i) => (
              <li key={i} style={{ marginBottom: "8px" }}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Result;