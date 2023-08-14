const express = require("express");
const app = express();

// Add CORS headers middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with your frontend's URL
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Rest of your server code

app.listen(80, () => {
  console.log("Server is running on port 80");
});
