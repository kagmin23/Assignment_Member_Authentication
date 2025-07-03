const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const memberRoutes = require("./routes/members.routes");
const teamRoutes = require("./routes/teams.routes");
const playerRoutes = require("./routes/players.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

module.exports = app;
