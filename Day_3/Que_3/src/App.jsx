import React, { useState, useRef, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const renderCount = useRef(0);
  const submitCount = useRef(0);
  const inputRef = useRef(null);

  useEffect(() => {
    renderCount.current += 1;
  });

  const handleSubmit = () => {
    submitCount.current += 1;

    console.log("Submit count:", submitCount.current);
  };

  const handleReset = () => {
    setName("");
  };

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div style={styles.container}>
      <h1>Form Interaction Tracker</h1>

      <input
        ref={inputRef}
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <p>
        <strong>You typed:</strong> {name}
      </p>

      <p>
        <strong>Render Count:</strong> {renderCount.current}
      </p>

      <div style={styles.buttonContainer}>
        <button onClick={handleSubmit}>Submit</button>

        <button onClick={handleReset}>Reset</button>

        <button onClick={handleFocus}>Focus Input</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    fontSize: "16px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
};

export default App;