const express = require("express");
const ticketRoutes = require("./routes/tickets");

// Initialise the express app
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/tickets", ticketRoutes);

// this is default in case of unmatched routes
app.use(function (req, res) {
  // Invalid request
  res.json({
    error: {
      name: "Error",
      message: "Invalid Request",
      statusCode: 404,
    },
  });
});

app.listen(PORT, () => console.log(`server running at PORT : ${PORT}`));

// use pm2 on linux instance for automatic restarts on failure, unable to setup on windows instance
