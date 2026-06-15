const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Load database
const dbPath = path.join(__dirname, "../data/db.json");
const loadDB = () => JSON.parse(fs.readFileSync(dbPath, "utf8"));
const saveDB = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// 1️⃣3️⃣ GET /api/schedules - Ambil jadwal pelayanan
router.get("/", (req, res) => {
  try {
    const db = loadDB();
    const schedules = db.schedules || [];

    res.status(200).json({
      success: true,
      message: "All schedules retrieved successfully",
      count: schedules.length,
      data: schedules,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching schedules",
      error: error.message,
    });
  }
});

// 1️⃣4️⃣ GET /api/schedules/:id - Ambil detail jadwal berdasarkan ID
router.get("/:id", (req, res) => {
  try {
    const db = loadDB();
    const schedule = db.schedules?.find(
      (s) => s.id === parseInt(req.params.id),
    );

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Schedule retrieved successfully",
      data: schedule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching schedule",
      error: error.message,
    });
  }
});

// 1️⃣5️⃣ POST /api/schedules - Tambah jadwal baru
router.post("/", (req, res) => {
  try {
    const {
      serviceName,
      dayOfWeek,
      startTime,
      endTime,
      location,
      capacity,
      description,
    } = req.body;

    // Validasi
    if (!serviceName || !dayOfWeek || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "serviceName, dayOfWeek, startTime, and endTime are required",
      });
    }

    const db = loadDB();
    const newSchedule = {
      id: (db.schedules?.length || 0) + 1,
      serviceName,
      dayOfWeek,
      startTime,
      endTime,
      location: location || "Main Office",
      capacity: capacity || 50,
      currentBookings: 0,
      description: description || "",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (!db.schedules) db.schedules = [];
    db.schedules.push(newSchedule);
    saveDB(db);

    res.status(201).json({
      success: true,
      message: "Schedule created successfully",
      data: newSchedule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating schedule",
      error: error.message,
    });
  }
});

// 1️⃣6️⃣ PUT /api/schedules/:id - Update jadwal
router.put("/:id", (req, res) => {
  try {
    const db = loadDB();
    const scheduleIndex = db.schedules?.findIndex(
      (s) => s.id === parseInt(req.params.id),
    );

    if (scheduleIndex === -1 || scheduleIndex === undefined) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    const {
      serviceName,
      dayOfWeek,
      startTime,
      endTime,
      location,
      capacity,
      description,
      status,
      currentBookings,
    } = req.body;

    db.schedules[scheduleIndex] = {
      ...db.schedules[scheduleIndex],
      ...(serviceName && { serviceName }),
      ...(dayOfWeek && { dayOfWeek }),
      ...(startTime && { startTime }),
      ...(endTime && { endTime }),
      ...(location && { location }),
      ...(capacity && { capacity }),
      ...(description && { description }),
      ...(status && { status }),
      ...(currentBookings !== undefined && { currentBookings }),
      updatedAt: new Date().toISOString(),
    };

    saveDB(db);

    res.status(200).json({
      success: true,
      message: "Schedule updated successfully",
      data: db.schedules[scheduleIndex],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating schedule",
      error: error.message,
    });
  }
});

// 1️⃣7️⃣ DELETE /api/schedules/:id - Hapus jadwal
router.delete("/:id", (req, res) => {
  try {
    const db = loadDB();
    const scheduleIndex = db.schedules?.findIndex(
      (s) => s.id === parseInt(req.params.id),
    );

    if (scheduleIndex === -1 || scheduleIndex === undefined) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    const deletedSchedule = db.schedules.splice(scheduleIndex, 1);
    saveDB(db);

    res.status(200).json({
      success: true,
      message: "Schedule deleted successfully",
      data: deletedSchedule[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting schedule",
      error: error.message,
    });
  }
});

module.exports = router;
