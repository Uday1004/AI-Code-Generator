import React, { useState, useEffect } from "react";

const WelcomeCard = () => {
  const [showCard, setShowCard] = useState(true);
  const [inputName, setInputName] = useState("");

  const handleOnChange = (e) => {
    setInputName(e.target.value);
  };

  useEffect(() => {
    const storedName = localStorage.getItem("PRoCodeUsername");
    if (storedName) {
      // ✅ Set name from localStorage
      setShowCard(false); // ✅ Hide the card if name exists
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("PRoCodeUsername", inputName); // ✅ Store name in localStorage
    window.dispatchEvent(new Event("storage")); // ✅ Notify other components of the update
    setShowCard(false); // ✅ Hide the form
  };

  return (
    <>
      {showCard && (
        <div
          className="container d-flex justify-content-center align-items-center vh-100"
          style={{
            position: "absolute",
            zIndex: "1000",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
          }}
        >
          <div className="card p-4 shadow" style={{ width: "400px" }}>
            <h4 className="text-center fs-4 mb-3">
              Let’s start! What should I call you? 🤔
            </h4>

            <form onSubmit={handleSubmit}>
              <div className="form-group text-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  value={inputName}
                  onChange={handleOnChange}
                />
                <button
                  type="submit"
                  className="btn btn-outline-success btn-block mt-2 mx-auto rounded-pill px-4"
                >
                  Enter!
                </button>
              </div>
            </form>

            <small className="form-text mt-3 text-muted text-center">
              We'll never share your name with anyone else.
            </small>

            <button
              className="btn btn-outline-warning btn-block mt-1 mx-auto rounded-pill px-4"
              onClick={() => setShowCard(false)}
            >
              Skip
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeCard;
