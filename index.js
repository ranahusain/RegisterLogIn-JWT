const express = require("express");
const app = express();
const connectDB = require("./db"); //required for creating database
const users = require("./routes/users"); //by this we get our apis
const PORT = 3000;

//body parser
app.use(express.json());
//connect to DB

connectDB();

app.use("/api", users);

//app.use("path", callback);
//All routes inside users will be accessible under /api
//http://localhost:3000/api/users/

app.get("/", (req, res) => {
  console.log("Inside home page route handler");
  res.send("Welcome");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log("Server Running");
});
