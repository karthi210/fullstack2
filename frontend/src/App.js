import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://65.0.129.234:8080/api/hello")
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => setMessage("Error connecting backend"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Fullstack App</h1>
      <h2>{message}</h2>
    </div>
  );
}

export default App;
