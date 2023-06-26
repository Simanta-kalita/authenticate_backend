const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ticketSchema = new Schema({
  seatNo: {
    type: Number,
    required: true,
    unique: true,
  },
  status: String,
  userInfo: { type: Schema.Types.ObjectId, ref: "User" },
  price: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
});

const User = mongoose.model("User", userSchema);
const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = {
  User,
  Ticket,
};
