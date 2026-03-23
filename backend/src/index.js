require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { ApiError } = require("./utils/apiHandler");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
const routes = require("./routes/index.js");


// Routes declaration
app.use("/api/v1", routes);

// Health Check
app.get("/", (req, res) => {
  res.send("API IS WORKING!");
});

// Global Error Handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Database connection and server start
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`\u2699\ufe0f  Server is running at port : ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
