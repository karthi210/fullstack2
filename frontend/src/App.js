import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://13.206.199.145:8080/api")
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
