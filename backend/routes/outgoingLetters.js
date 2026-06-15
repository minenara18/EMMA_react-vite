const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Load database
const dbPath = path.join(__dirname, "../data/db.json");
const loadDB = () => JSON.parse(fs.readFileSync(dbPath, "utf8"));
const saveDB = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// 1️⃣8️⃣ GET /api/outgoing-letters - Ambil daftar surat keluar
router.get("/", (req, res) => {
  try {
    const db = loadDB();
    const letters = db.outgoingLetters || [];

    res.status(200).json({
      success: true,
      message: "All outgoing letters retrieved successfully",
      count: letters.length,
      data: letters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching outgoing letters",
      error: error.message,
    });
  }
});

// 1️⃣9️⃣ GET /api/outgoing-letters/:id - Ambil detail surat berdasarkan ID
router.get("/:id", (req, res) => {
  try {
    const db = loadDB();
    const letter = db.outgoingLetters?.find(
      (l) => l.id === parseInt(req.params.id),
    );

    if (!letter) {
      return res.status(404).json({
        success: false,
        message: "Outgoing letter not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Outgoing letter retrieved successfully",
      data: letter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching outgoing letter",
      error: error.message,
    });
  }
});

// 2️⃣0️⃣ POST /api/outgoing-letters - Buat surat keluar baru
router.post("/", (req, res) => {
  try {
    const {
      letterNumber,
      title,
      recipient,
      content,
      recipientAddress,
      createdBy,
      approvedBy,
      attachments,
    } = req.body;

    // Validasi
    if (!letterNumber || !title || !recipient) {
      return res.status(400).json({
        success: false,
        message: "letterNumber, title, and recipient are required",
      });
    }

    const db = loadDB();
    const newLetter = {
      id: (db.outgoingLetters?.length || 0) + 1,
      letterNumber,
      title,
      recipient,
      recipientAddress: recipientAddress || "",
      content: content || "",
      createdBy: createdBy || "System",
      approvedBy: approvedBy || null,
      attachments: attachments || [],
      status: "draft",
      sentDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (!db.outgoingLetters) db.outgoingLetters = [];
    db.outgoingLetters.push(newLetter);
    saveDB(db);

    res.status(201).json({
      success: true,
      message: "Outgoing letter created successfully",
      data: newLetter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating outgoing letter",
      error: error.message,
    });
  }
});

// 2️⃣1️⃣ PUT /api/outgoing-letters/:id - Update surat keluar
router.put("/:id", (req, res) => {
  try {
    const db = loadDB();
    const letterIndex = db.outgoingLetters?.findIndex(
      (l) => l.id === parseInt(req.params.id),
    );

    if (letterIndex === -1 || letterIndex === undefined) {
      return res.status(404).json({
        success: false,
        message: "Outgoing letter not found",
      });
    }

    const {
      title,
      recipient,
      content,
      recipientAddress,
      status,
      approvedBy,
      sentDate,
    } = req.body;

    db.outgoingLetters[letterIndex] = {
      ...db.outgoingLetters[letterIndex],
      ...(title && { title }),
      ...(recipient && { recipient }),
      ...(content && { content }),
      ...(recipientAddress && { recipientAddress }),
      ...(status && { status }),
      ...(approvedBy && { approvedBy }),
      ...(sentDate && { sentDate }),
      updatedAt: new Date().toISOString(),
    };

    saveDB(db);

    res.status(200).json({
      success: true,
      message: "Outgoing letter updated successfully",
      data: db.outgoingLetters[letterIndex],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating outgoing letter",
      error: error.message,
    });
  }
});

// 2️⃣2️⃣ DELETE /api/outgoing-letters/:id - Hapus surat keluar
router.delete("/:id", (req, res) => {
  try {
    const db = loadDB();
    const letterIndex = db.outgoingLetters?.findIndex(
      (l) => l.id === parseInt(req.params.id),
    );

    if (letterIndex === -1 || letterIndex === undefined) {
      return res.status(404).json({
        success: false,
        message: "Outgoing letter not found",
      });
    }

    const deletedLetter = db.outgoingLetters.splice(letterIndex, 1);
    saveDB(db);

    res.status(200).json({
      success: true,
      message: "Outgoing letter deleted successfully",
      data: deletedLetter[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting outgoing letter",
      error: error.message,
    });
  }
});

module.exports = router;
