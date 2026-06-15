const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Load database
const dbPath = path.join(__dirname, "../data/db.json");
const loadDB = () => JSON.parse(fs.readFileSync(dbPath, "utf8"));

// 1️⃣ GET /api/dashboard/summary - Ambil ringkasan statistik
router.get("/summary", (req, res) => {
  try {
    const db = loadDB();

    const summary = {
      totalDocuments: db.documents ? db.documents.length : 0,
      totalInvoices: db.invoices ? db.invoices.length : 0,
      totalSchedules: db.schedules ? db.schedules.length : 0,
      totalOutgoingLetters: db.outgoingLetters ? db.outgoingLetters.length : 0,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json({
      success: true,
      message: "Dashboard summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard summary",
      error: error.message,
    });
  }
});

// 2️⃣ GET /api/dashboard/recent-activities - Ambil aktivitas terbaru
router.get("/recent-activities", (req, res) => {
  try {
    const db = loadDB();

    const activities = [
      ...(db.documents
        ? db.documents.slice(-5).map((doc) => ({
            type: "document",
            title: `Document: ${doc.title}`,
            timestamp: doc.createdAt,
            action: "created",
          }))
        : []),
      ...(db.invoices
        ? db.invoices.slice(-5).map((inv) => ({
            type: "invoice",
            title: `Invoice: ${inv.invoiceNumber}`,
            timestamp: inv.createdAt,
            action: "created",
          }))
        : []),
      ...(db.outgoingLetters
        ? db.outgoingLetters.slice(-5).map((letter) => ({
            type: "letter",
            title: `Letter: ${letter.title}`,
            timestamp: letter.createdAt,
            action: "created",
          }))
        : []),
    ]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);

    res.status(200).json({
      success: true,
      message: "Recent activities retrieved successfully",
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching recent activities",
      error: error.message,
    });
  }
});

module.exports = router;
