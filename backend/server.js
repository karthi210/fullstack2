const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "mysql-db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root123",
  database: process.env.DB_NAME || "contactsdb"
});

function connectWithRetry() {
  db.connect((err) => {
    if (err) {
      console.log("MySQL connection failed. Retrying in 5 seconds...", err.message);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("Connected to MySQL database");
    }
  });
}
connectWithRetry();

app.get("/", (req, res) => {
  res.send("Backend API is running ");
});

app.get("/contacts", (req, res) => {
  db.query("SELECT * FROM contacts ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

app.post("/contacts", (req, res) => {
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    return res.status(400).json({ message: "name, phone, and email are required" });
  }

  db.query(
    "INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)",
    [name, phone, email],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Contact added successfully" });
    }
  );
});

app.put("/contacts/:id", (req, res) => {
  const { name, phone, email } = req.body;
  db.query(
    "UPDATE contacts SET name=?, phone=?, email=? WHERE id=?",
    [name, phone, email, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Contact updated successfully" });
    }
  );
});

app.delete("/contacts/:id", (req, res) => {
  db.query("DELETE FROM contacts WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Contact deleted successfully" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
