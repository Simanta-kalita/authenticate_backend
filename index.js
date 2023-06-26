const express = require("express");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const ticketRoutes = require("./routes/tickets");

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "busticket",
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connection to Database successful!");
});

// Initialise the express app
const app = express();
const PORT = process.env.PORT || 5000;

// Create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE busticket";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created...");
  });
});

// Create table

app.get("/createticketstable", (req, res) => {
  let sql =
    "CREATE TABLE tickets(seatNo int NOT NULL, status VARCHAR(255), name VARCHAR(255), email VARCHAR(255), date DATETIME, PRIMARY KEY (seatNo))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Tickets table created...");
  });
});

// app.get("/createuserstable", (req, res) => {
//   let sql =
//     "CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), PRIMARY KEY (seatNo))";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Tickets table created...");
//   });
// });

// Insert ticket 1

app.get("/addticket1", (req, res) => {
  let ticket = { seatNo: 1, status: "open" };
  let sql = "INSERT INTO tickets SET ?";
  let query = db.query(sql, ticket, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Ticket 1 added...");
  });
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hi, I am live at PORT : ${PORT}`);
});

app.use("/api/tickets", ticketRoutes);

// mongoose
//   .connect("mongodb://localhost:27017/busticket", {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("connection to Database successful!"))
//   .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server running at PORT : ${PORT}`));
