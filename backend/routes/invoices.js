const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Load database
const dbPath = path.join(__dirname, "../data/db.json");
const loadDB = () => JSON.parse(fs.readFileSync(dbPath, "utf8"));
const saveDB = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// 8️⃣ GET /api/invoices - Ambil daftar semua invoice
router.get("/", (req, res) => {
  try {
    const db = loadDB();
    const invoices = db.invoices || [];

    res.status(200).json({
      success: true,
      message: "All invoices retrieved successfully",
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching invoices",
      error: error.message,
    });
  }
});

// 9️⃣ GET /api/invoices/:id - Ambil detail invoice berdasarkan ID
router.get("/:id", (req, res) => {
  try {
    const db = loadDB();
    const invoice = db.invoices?.find((i) => i.id === parseInt(req.params.id));

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice retrieved successfully",
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching invoice",
      error: error.message,
    });
  }
});

// 🔟 POST /api/invoices - Buat invoice baru
router.post("/", (req, res) => {
  try {
    const {
      invoiceNumber,
      customerName,
      amount,
      dueDate,
      description,
      items,
      tax,
      discount,
    } = req.body;

    // Validasi
    if (!invoiceNumber || !customerName || !amount) {
      return res.status(400).json({
        success: false,
        message: "invoiceNumber, customerName, and amount are required",
      });
    }

    const db = loadDB();
    const totalAmount = amount + (tax || 0) - (discount || 0);

    const newInvoice = {
      id: (db.invoices?.length || 0) + 1,
      invoiceNumber,
      customerName,
      amount,
      tax: tax || 0,
      discount: discount || 0,
      totalAmount,
      dueDate:
        dueDate ||
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      description: description || "",
      items: items || [],
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (!db.invoices) db.invoices = [];
    db.invoices.push(newInvoice);
    saveDB(db);

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: newInvoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating invoice",
      error: error.message,
    });
  }
});

// 1️⃣1️⃣ PUT /api/invoices/:id - Update status invoice
router.put("/:id", (req, res) => {
  try {
    const db = loadDB();
    const invoiceIndex = db.invoices?.findIndex(
      (i) => i.id === parseInt(req.params.id),
    );

    if (invoiceIndex === -1 || invoiceIndex === undefined) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    const { status, amount, tax, discount, dueDate } = req.body;

    let updatedInvoice = { ...db.invoices[invoiceIndex] };

    if (amount || tax !== undefined || discount !== undefined) {
      const newAmount = amount || updatedInvoice.amount;
      const newTax = tax !== undefined ? tax : updatedInvoice.tax;
      const newDiscount =
        discount !== undefined ? discount : updatedInvoice.discount;

      updatedInvoice = {
        ...updatedInvoice,
        amount: newAmount,
        tax: newTax,
        discount: newDiscount,
        totalAmount: newAmount + newTax - newDiscount,
      };
    }

    if (status) updatedInvoice.status = status;
    if (dueDate) updatedInvoice.dueDate = dueDate;

    updatedInvoice.updatedAt = new Date().toISOString();
    db.invoices[invoiceIndex] = updatedInvoice;

    saveDB(db);

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: db.invoices[invoiceIndex],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating invoice",
      error: error.message,
    });
  }
});

// 1️⃣2️⃣ DELETE /api/invoices/:id - Hapus invoice
router.delete("/:id", (req, res) => {
  try {
    const db = loadDB();
    const invoiceIndex = db.invoices?.findIndex(
      (i) => i.id === parseInt(req.params.id),
    );

    if (invoiceIndex === -1 || invoiceIndex === undefined) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    const deletedInvoice = db.invoices.splice(invoiceIndex, 1);
    saveDB(db);

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
      data: deletedInvoice[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting invoice",
      error: error.message,
    });
  }
});

module.exports = router;
