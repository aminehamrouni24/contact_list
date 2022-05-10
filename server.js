const express = require("express");
const db = require("./config/db");
const path = require("path");

require("dotenv").config();
const app = express();



const PORT = process.env.PORT || 6000;

db();

app.use(express.json());
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contact', require("./routes/contactRoutes"));




app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT : ${PORT}`);
});
