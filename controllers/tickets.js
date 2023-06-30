const connection = require("../db/db");
const _ = require("lodash");
const logger = require("pino")();

/* update or insert ticket status */
const updateInfo = async (req, res) => {
  logger.info(req.body);
  let { seatNo, status, email, name } = req.body;
  let date = new Date().toISOString().slice(0, 19).replace("T", " ");

  // check if seat number is between 1 and 40
  if (!_.isNumber(seatNo) || seatNo < 1 || seatNo > 40) {
    return res.send({
      statusCode: 400,
      message: "Please enter valid seat number",
    });
  }

  // if status is reset to "open", then reset the user data
  if (status === "open") {
    email = "";
    name = "";
    date = "1000-01-01"; /* A default value is put, can be regarded as empty */
  }

  const ticketInfo = {
    seatNo,
    status,
    email,
    name,
    date,
  };

  if (status === "open" || status === "closed") {
    try {
      const sql = `UPDATE tickets SET name = COALESCE( ?, name), email = COALESCE( ?, email), status = COALESCE( ?, status), date =  COALESCE( ?, date) WHERE seatNo = ?`;
      connection.query(
        sql,
        [name, email, status, date, seatNo],
        (err, result) => {
          console.log(result);
          if (result.affectedRows === 0) {
            // if ticket is closed, name and email is mandatory
            if (status === "closed" && (_.isEmpty(name) || _.isEmpty(email))) {
              return res.send({
                statusCode: 400,
                message:
                  "Please enter valid name and email when booking ticket",
              });
            }
            const sql = "INSERT INTO tickets SET ?";
            connection.query(sql, ticketInfo, (err, result) => {
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
  } else {
    return res.send({
      statusCode: 400,
      message: "Please enter valid status value",
    });
  }
};

/* view open or closed tickets */
const getTickets = async (req, res) => {
  logger.info(req.body);
  const { status } = req.body;

  // check if string is valid
  if (!status || _.isNumber(status)) {
    return res.send({
      statusCode: 400,
      message: "Please enter valid status value",
    });
  }

  if (status === "open" || status === "closed") {
    try {
      connection.query(
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
  } else {
    return res.send({
      statusCode: 400,
      message: "Please enter valid status value",
    });
  }
};

/* view ticket status */
const getTicketStatus = async (req, res) => {
  logger.info(req.body);
  let { seatNo } = req.params;
  seatNo = Number(seatNo);

  // check if seat number is between 1 and 40
  if (!_.isNumber(seatNo) || isNaN(seatNo) || seatNo < 1 || seatNo > 40) {
    return res.send({
      statusCode: 400,
      message: "Please enter valid seat number",
    });
  }

  try {
    connection.query(
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

/* view Details of the person owning the ticket */
const userDetails = async (req, res) => {
  logger.info(req.body);
  let { seatNo } = req.params;
  seatNo = Number(seatNo);

  // check if seat number is between 1 and 40
  if (!_.isNumber(seatNo) || isNaN(seatNo) || seatNo < 1 || seatNo > 40) {
    return res.send({
      statusCode: 400,
      message: "Please enter valid seat number",
    });
  }

  try {
    connection.query(
      `SELECT name, email, status, (SELECT group_concat(seatNo) FROM (SELECT * from tickets WHERE email=(SELECT email FROM tickets WHERE seatNo=${seatNo})) AS T) AS seatNumbers FROM tickets WHERE seatNo=${seatNo}`,
      function (err, data) {
        if (err) {
          res.send({
            statusCode: 400,
            message: "Data not available",
            error: err,
          });
        } else {
          if (data && data.length > 0 && data[0].status === "open") {
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

/* additional API for admin to reset the server (opens up all the tickets) */
const reset = async (req, res) => {
  logger.info(req.body);
  try {
    const sql =
      "UPDATE tickets SET `status`='open', `name`='', `email`='', `date`='1000-01-01'";
    connection.query(sql, (err, result) => {
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
