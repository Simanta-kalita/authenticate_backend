const connection = require("../db/db");

// Create DB
const createDB = (req, res) => {
  let sql = "CREATE DATABASE busticket";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created...");
  });
};

// Create table
const createTable = (req, res) => {
  let sql =
    "CREATE TABLE tickets(seatNo int NOT NULL, status VARCHAR(255), name VARCHAR(255), email VARCHAR(255), date DATETIME, PRIMARY KEY (seatNo))";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Tickets table created...");
  });
};

// Insert one ticket
const insert = (req, res) => {
  let ticket = { seatNo: 1, status: "open" };
  let sql = "INSERT INTO tickets SET ?";
  let query = connection.query(sql, ticket, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Ticket inserted...");
  });
};

module.exports = {
  createDB,
  createTable,
  insert,
};
