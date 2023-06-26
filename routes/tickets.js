const express = require("express");
const router = express.Router();
const {
  getTickets,
  getTicketStatus,
  userDetails,
  reset,
  updateInfo,
} = require("../controllers/tickets");
const { insert, createTable, createDB } = require("../controllers/start");

// Basic routes needed after starting project
router.get("/createdb", createDB);
router.get("/createticketstable", createTable);
router.get("/insert", insert);

// Main business logic routes
router.post("/info", getTickets);
router.post("/update", updateInfo);
router.get("/status/:seatNo", getTicketStatus);
router.get("/user/:seatNo", userDetails);
router.get("/reset", reset);

module.exports = router;
