// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // to serve your HTML files

// Database substitute: local JSON file
const DB_FILE = "students.json";

// Helper: read student data
const readData = () => {
  if (!fs.existsSync(DB_FILE)) return [];
  const data = fs.readFileSync(DB_FILE);
  return JSON.parse(data || "[]");
};

// Helper: write student data
const writeData = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// ✅ Signup route
app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required!" });

  const students = readData();

  // Check for duplicate email
  const existing = students.find((u) => u.email === email);
  if (existing)
    return res.status(400).json({ message: "Email already registered!" });

  const newStudent = { name, email, password };
  students.push(newStudent);
  writeData(students);

  res.status(200).json({ message: "Signup successful!" });
});

// ✅ Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const students = readData();

  const student = students.find(
    (u) => u.email === email && u.password === password
  );

  if (!student)
    return res.status(401).json({ message: "Invalid credentials" });

  res.status(200).json({ message: "Login successful!", student });
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



