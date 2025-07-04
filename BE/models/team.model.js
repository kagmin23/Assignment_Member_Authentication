const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
