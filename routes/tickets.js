const express = require("express");
const router = express.Router();
const {
  getTickets,
  getTicketStatus,
  userDetails,
  reset,
  updateInfo,
} = require("../controllers/tickets");

router.post("/ticketInfo", getTickets);
router.post("/setInfo", updateInfo);
router.get("/status/:seatNo", getTicketStatus);
router.get("/user/:seatNo", userDetails);
router.get("/reset", reset);

module.exports = router;
