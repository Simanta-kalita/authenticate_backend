const connection = require("../db/db");

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
    connection.query(
      sql,
      [name, email, status, date, seatNo],
      (err, result) => {
        if (result.affectedRows === 0) {
          const sql = "INSERT INTO tickets SET ?";
          connection.query(sql, ticketInfo, (err, result) => {
            if (err) throw err;
            console.log(result);
          });
        }
        if (err) throw err;
        console.log(result);
        res.send("Ticket added...");
      }
    );

    //using REPLACE
    // const sql = "REPLACE INTO tickets SET ?";
    // connection.query(sql, ticketInfo, (err, result) => {
    //   if (err) throw err;
    //   console.log(result);
    //   res.status(200).send("Ticket added...");
    // });
  } catch (err) {
    res.send(err);
  }
};

const getTickets = async (req, res) => {
  const { status } = req.body;
  try {
    connection.query(
      `SELECT * FROM tickets WHERE status='${status}' ORDER BY seatNo asc`,
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            data,
          });
        }
      }
    );
  } catch (err) {
    res.send(err);
  }
};

const getTicketStatus = async (req, res) => {
  const { seatNo } = req.params;
  try {
    connection.query(
      `SELECT * FROM tickets WHERE seatNo=${seatNo} LIMIT 1`,
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            data,
          });
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};

const userDetails = async (req, res) => {
  const { seatNo } = req.params;
  try {
    connection.query(
      `SELECT name, email, (SELECT group_concat(seatNo) FROM (SELECT * from tickets WHERE email=(SELECT email FROM tickets WHERE seatNo=${seatNo})) AS T) AS seatNumbers FROM tickets WHERE seatNo=${seatNo}`,
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            data,
          });
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};

const reset = async (req, res) => {
  try {
    const sql = "UPDATE tickets SET `status`='open'";
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("All data is reset");
    });
  } catch (error) {
    res.status(400).send(err);
  }
};

module.exports = {
  updateInfo,
  getTickets,
  getTicketStatus,
  userDetails,
  reset,
};
