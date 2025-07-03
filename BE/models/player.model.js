const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  image: String,
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  isCaptain: { type: Boolean, default: false },
  comments: [
    {
      rating: Number,
      content: String,
      author: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Player", playerSchema);
