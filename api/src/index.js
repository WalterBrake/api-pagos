//Get the express service
import express from "express";
var fs = require("fs"); //for file system
var morgan = require("morgan"); //HTTP request logger middleware
var path = require("path"); //the path
var rfs = require("rotating-file-stream"); //logger
var bodyParser = require("body-parser");

const app = express();

//get the cors
var cors = require("cors");

//use cors
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//log file
var logDirectory = path.join(__dirname, "../../log");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create a rotating write stream
const accessLogStream = rfs.createStream("access.log", {
  size: "5M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
  path: logDirectory,
});

// setup the logger
app.use(
  morgan("common", {
    stream: accessLogStream,
  })
);

//Importing Routes
import paymentRoutes from "./routes/payments.js";
import userRoutes from "./routes/users.js";

//Parse application/json
app.use(
  bodyParser.json({
    limit: "15mb",
    extended: true,
  })
);

//Define the port
app.set("port", process.env.PORT || 4000);

//middlewares

//routes without authorization
app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRoutes);

//error handler
app.use((req, res, next) => {
  res.status(404);
  res.json({
    error: "Error. Endpoint not found",
    vervose: "d",
  });
});

app.use(function (err, req, res, next) {
  return res.status(500).send("Internal Server Occured");
});

app.listen(app.get("port"), () => {
  console.log("server is runnign", app.get("port"));
});
