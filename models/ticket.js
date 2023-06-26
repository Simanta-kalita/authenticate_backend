// const mongoose = require("mongoose"),
//   Schema = mongoose.Schema;

// const ticketSchema = new Schema({
//   seatNo: {
//     type: mongoose.SchemaTypes.ObjectId,
//     required: true,
//     unique: true,
//   },
//   status: {
//     type: String,
//     default: "open",
//   },
//   email: String,
//   price: {
//     type: String,
//     required: true,
//   },
// });

// const userSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now(),
//   },
//   tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
// });

// const User = mongoose.model("User", userSchema);
// const Ticket = mongoose.model("Ticket", ticketSchema);

// module.exports = {
//   User,
//   Ticket,
// };
