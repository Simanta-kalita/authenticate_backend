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
router.get("/db/create", createDB);
router.get("/table/create", createTable);
router.get("/insert", insert);

// Main business logic routes
router.post("/info", getTickets);
router.post("/update", updateInfo);
router.get("/status/:seatNo", getTicketStatus);
router.get("/user/:seatNo", userDetails);
router.get("/reset", reset);

// this is default in case of unmatched routes
router.use(function (req, res) {
  // Invalid request
  res.json({
    error: {
      name: "Error",
      message: "Invalid Request",
      statusCode: 404,
    },
  });
});

module.exports = router;
