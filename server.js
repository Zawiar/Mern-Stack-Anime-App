const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");

const cors = require("cors");
//Users route
const usersRoute = require("./routes/api/users");
const profileRoute = require("./routes/api/profiles");

//dotenv configuration
dotenv.config({ path: "./config/config.env" });

//database connection function
const connectDB = require("./config/connectdb");

//initalize express
const app = express();

//connect to DB
connectDB();

//middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Express bodyparser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Initialize Passort
app.use(passport.initialize());
//get passport function
require("./config/passport")(passport);
app.use("/routes/api", usersRoute);
app.use("/routes/api", profileRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/build/index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT localhost:${PORT}`));
