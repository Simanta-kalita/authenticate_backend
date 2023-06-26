const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ticketRoutes = require("./routes/tickets");

// Initialise the express app
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hi, I am live at PORT : ${PORT}`);
});

app.use("/api/tickets", ticketRoutes);

mongoose
  .connect("mongodb://localhost:27017/busticket", {
    useNewUrlParser: true,
  })
  .then(() => console.log("connection to Database successful!"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server running at PORT : ${PORT}`));
