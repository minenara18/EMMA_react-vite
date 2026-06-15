const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Load database
const dbPath = path.join(__dirname, "../data/db.json");
const loadDB = () => JSON.parse(fs.readFileSync(dbPath, "utf8"));
const saveDB = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// 3️⃣ GET /api/documents - Ambil daftar semua dokumen
router.get("/", (req, res) => {
  try {
    const db = loadDB();
    const documents = db.documents || [];

    res.status(200).json({
      success: true,
      message: "All documents retrieved successfully",
      count: documents.length,
      data: documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching documents",
      error: error.message,
    });
  }
});

// 4️⃣ GET /api/documents/:id - Ambil detail dokumen berdasarkan ID
router.get("/:id", (req, res) => {
  try {
    const db = loadDB();
    const document = db.documents?.find(
      (d) => d.id === parseInt(req.params.id),
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Document retrieved successfully",
      data: document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching document",
      error: error.message,
    });
  }
});

// 5️⃣ POST /api/documents - Tambah dokumen baru
router.post("/", (req, res) => {
  try {
    const { title, fileName, fileType, fileSize, category, uploadedBy } =
      req.body;

    // Validasi
    if (!title || !fileName) {
      return res.status(400).json({
        success: false,
        message: "Title and fileName are required",
      });
    }

    const db = loadDB();
    const newDocument = {
      id: (db.documents?.length || 0) + 1,
      title,
      fileName,
      fileType: fileType || "pdf",
      fileSize: fileSize || 0,
      category: category || "general",
      uploadedBy: uploadedBy || "System",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (!db.documents) db.documents = [];
    db.documents.push(newDocument);
    saveDB(db);

    res.status(201).json({
      success: true,
      message: "Document created successfully",
      data: newDocument,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating document",
      error: error.message,
    });
  }
});

// 6️⃣ PUT /api/documents/:id - Edit dokumen
router.put("/:id", (req, res) => {
  try {
    const db = loadDB();
    const documentIndex = db.documents?.findIndex(
      (d) => d.id === parseInt(req.params.id),
    );

    if (documentIndex === -1 || documentIndex === undefined) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const { title, fileName, fileType, category } = req.body;

    db.documents[documentIndex] = {
      ...db.documents[documentIndex],
      ...(title && { title }),
      ...(fileName && { fileName }),
      ...(fileType && { fileType }),
      ...(category && { category }),
      updatedAt: new Date().toISOString(),
    };

    saveDB(db);

    res.status(200).json({
      success: true,
      message: "Document updated successfully",
      data: db.documents[documentIndex],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating document",
      error: error.message,
    });
  }
});

// 7️⃣ DELETE /api/documents/:id - Hapus dokumen
router.delete("/:id", (req, res) => {
  try {
    const db = loadDB();
    const documentIndex = db.documents?.findIndex(
      (d) => d.id === parseInt(req.params.id),
    );

    if (documentIndex === -1 || documentIndex === undefined) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const deletedDocument = db.documents.splice(documentIndex, 1);
    saveDB(db);

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
      data: deletedDocument[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting document",
      error: error.message,
    });
  }
});

module.exports = router;
