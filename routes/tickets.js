const express = require("express");
const router = express.Router();
const {
  getTickets,
  getTicketStatus,
  userDetails,
  reset,
  updateInfo,
} = require("../controllers/tickets");

console.log("hello ");

router.post("/tickets", getTickets);
router.post("/setInfo", updateInfo);

module.exports = router;
