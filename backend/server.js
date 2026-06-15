const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routes
const dashboardRoutes = require("./routes/dashboard");
const documentRoutes = require("./routes/documents");
const invoiceRoutes = require("./routes/invoices");
const scheduleRoutes = require("./routes/schedules");
const outgoingLetterRoutes = require("./routes/outgoingLetters");

// Use Routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/outgoing-letters", outgoingLetterRoutes);

// Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "API Backend EMMA Management System is running! ✅" });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Internal Server Error", message: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
