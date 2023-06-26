const { User, Ticket } = require("../models/ticket");

const updateInfo = async (req, res) => {
  console.log(req.body);
  try {
    const { ticketInfo, userInfo } = req.body;

    const ticketResult = await Ticket.findOneAndUpdate(
      { seatNo: ticketInfo.seatNo },
      ticketInfo,
      { upsert: true }
    );
    res.status(200).send(ticketResult);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getTickets = async (req, res) => {
  const { status } = req.body;
  try {
    const tickets = await Ticket.find({ status });
    return {
      tickets,
    };
  } catch (err) {
    return {
      error: err,
    };
  }
};

const getTicketStatus = async (req, res) => {
  const { seatNo } = req.body;
  try {
    const ticketData = await Ticket.findOne({ seatNo });
    return {
      ticketData,
    };
  } catch (err) {
    return {
      error: err,
    };
  }
};

const userDetails = async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await User.findOne({ email });
    return {
      userData,
    };
  } catch (err) {
    return {
      error: err,
    };
  }
};

const reset = async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await Ticket.updateMany({ email });
    return {
      userData,
    };
  } catch (err) {
    return {
      error: err,
    };
  }
};

module.exports = {
  updateInfo,
  getTickets,
  getTicketStatus,
  userDetails,
  reset,
};
