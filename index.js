const express = require("express");
const ticketRoutes = require("./routes/tickets");

// Initialise the express app
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/tickets", ticketRoutes);

app.listen(PORT, () => console.log(`server running at PORT : ${PORT}`));
