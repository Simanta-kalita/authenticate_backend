const connection = require("../db/db");

// update or insert ticket status
const updateInfo = async (req, res) => {
  console.log(req.body);
  try {
    const { seatNo, status, email, name } = req.body;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");

    const ticketInfo = {
      seatNo,
      status,
      email,
      name,
      date,
    };

    const sql = `UPDATE tickets SET name = COALESCE( ?, name), email = COALESCE( ?, email), status = COALESCE( ?, status), date =  COALESCE( ?, date) WHERE seatNo = ?`;
    await connection.query(
      sql,
      [name, email, status, date, seatNo],
      async (err, result) => {
        if (result.affectedRows === 0) {
          const sql = "INSERT INTO tickets SET ?";
          await connection.query(sql, ticketInfo, (err, result) => {
            if (err) throw err;
            console.log(result);
          });
        }
        if (err) throw err;
        console.log(result);
        res.send({
          statusCode: 200,
          message: "Ticket added/updated",
        });
      }
    );
  } catch (err) {
    res.send({
      statusCode: 400,
      message: err,
    });
  }
};

// view open or closed tickets
const getTickets = async (req, res) => {
  const { status } = req.body;
  try {
    await connection.query(
      `SELECT * FROM tickets WHERE status='${status}' ORDER BY seatNo asc`,
      function (err, data) {
        if (err) {
          res.send({
            statusCode: 400,
            message: err,
          });
        } else {
          res.send({
            statusCode: 200,
            message: "Query executed",
            data,
          });
        }
      }
    );
  } catch (err) {
    res.send({
      statusCode: 400,
      message: err,
    });
  }
};

// view ticket status
const getTicketStatus = async (req, res) => {
  const { seatNo } = req.params;
  try {
    await connection.query(
      `SELECT * FROM tickets WHERE seatNo=${seatNo} LIMIT 1`,
      function (err, data) {
        if (err) {
          res.send({
            statusCode: 400,
            message: err,
          });
        } else {
          res.send({
            statusCode: 200,
            message: "Query executed",
            data,
          });
        }
      }
    );
  } catch (err) {
    res.send({
      statusCode: 400,
      message: err,
    });
  }
};

// view Details of the person owning the ticket
const userDetails = async (req, res) => {
  const { seatNo } = req.params;
  try {
    await connection.query(
      `SELECT name, email, status, (SELECT group_concat(seatNo) FROM (SELECT * from tickets WHERE email=(SELECT email FROM tickets WHERE seatNo=${seatNo})) AS T) AS seatNumbers FROM tickets WHERE seatNo=${seatNo}`,
      function (err, data) {
        if (err) {
          res.send({
            statusCode: 400,
            message: err,
          });
        } else {
          if (data && data[0].status === "open") {
            res.send({
              statusCode: 200,
              message: "No user data available for open tickets",
            });
          } else {
            res.send({
              statusCode: 200,
              message: "Query executed",
              data,
            });
          }
        }
      }
    );
  } catch (err) {
    res.send({
      statusCode: 400,
      message: err,
    });
  }
};

// additional API for admin to reset the server (opens up all the tickets)
const reset = async (req, res) => {
  try {
    const sql = "UPDATE tickets SET `status`='open'";
    await connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send({
        statusCode: 200,
        message: "All data is reset",
      });
    });
  } catch (error) {
    res.send({
      statusCode: 400,
      message: err,
    });
  }
};

module.exports = {
  updateInfo,
  getTickets,
  getTicketStatus,
  userDetails,
  reset,
};
