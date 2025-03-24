import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import { Sandpack } from "@codesandbox/sandpack-react";
import "../Component/Live.css";
import { githubLight } from "@codesandbox/sandpack-themes";
import { basicSetup } from "@codemirror/basic-setup";
import { autocompletion } from "@codemirror/autocomplete";

function Live() {
  const [code, setCode] = useState("");
  const [prompt, setPrompt] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [loading, setLoading] = useState(false);

  const cleanGeneratedCode = (rawCode) => {
    if (!rawCode) return ""; // Handle undefined or null response
    let cleaned = rawCode.replace(/```jsx|```javascript|```/g, "").trim();
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
      cleaned = cleaned.slice(1, -1);
    }
    return cleaned;
  };

  const runAnimation = () => {
    const inputContainer = document.querySelector(".prompt-container");

    if (inputContainer) {
      inputContainer.style.transition =
        "transform 0.5s ease-in-out, opacity 0.5s";
      inputContainer.style.transform = "translateY(-100px)";
      inputContainer.style.opacity = "0";
    }
  };

  const handleSubmit = async () => {
    runAnimation(); // Run animation before submission
    setTimeout(() => {
      setLoading(true);
    }, 1000);

    setTimeout(async () => {
      setShowEditor(true); // Show Sandpack after animation

      if (!prompt.trim()) {
        alert("Please enter a prompt.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        let cleanedCode = cleanGeneratedCode(data.code);

        setCode(cleanedCode);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to generate code. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 500); // Delay fetching data until animation completes
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission (if inside a form)
      handleSubmit();
    }
  };

  return (
    <>
      <div className="live-container">
        <div
          className="display-3"
          style={{ marginBottom: "5rem", marginTop: "0" }}
        >
          Hello uday
        </div>
        {!showEditor && (
          <div className="prompt-container">
            <input
              type="text"
              placeholder="Enter your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="prompt-input"
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSubmit} className="submit-button">
              Generate
            </button>
          </div>
        )}

        {loading ? (
          <>
            <HashLoader
              color={"#e2cdff"}
              loading={loading}
              size={55}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <div
              style={{
                color: "#e2cdff",
                fontFamily: "cursive",
                fontSize: "1.5rem",
                marginTop: "1.5rem",
              }}
            >
              Wait for the magic..🌟
            </div>
          </>
        ) : (
          showEditor &&
          code && (
            <div className="sandpack-container animate">
              <Sandpack
                template="react"
                theme={githubLight}
                customSetup={{
                  dependencies: {
                    react: "latest",
                    "react-dom": "latest",
                    "react-router-dom": "latest",
                    bootstrap: "latest",
                    tailwindcss: "latest",
                    "@react-spring/web": "latest",
                    "@codesandbox/sandpack-react": "latest",
                    "react-redux": "^8.0.5",
                    "@reduxjs/toolkit": "^1.9.1",
                    axios: "latest",
                    formik: "latest",
                    yup: "latest",
                    lodash: "latest",
                    "framer-motion": "latest",
                    clsx: "latest",
                    zustand: "latest",
                    recoil: "latest",
                    "react-icons": "latest",
                    "react-query": "latest",
                    "@tanstack/react-query": "latest",
                    "react-toastify": "latest",
                    uuid: "latest",
                    "date-fns": "latest",
                    "@mui/material": "latest",
                    "@mui/icons-material": "latest",
                  },
                }}
                files={{
                  "/App.js": {
                    code: code,
                    active: true,
                  },
                }}
                options={{
                  showNavigator: true,
                  showLineNumbers: true,
                  extensions: [basicSetup, autocompletion()],
                  editorHeight: 500,
                  editorWidthPercentage: 60,
                  wrapContent: true,
                }}
                // style={{ width: "85rem", height: "400px", margin: "auto" }}
              />
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Live;
