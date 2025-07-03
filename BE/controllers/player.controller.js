const Player = require("../models/player.model");

exports.getPlayers = async (req, res) => {
  try {
    const { name, team } = req.query;
    const query = {};

    if (name) query.playerName = { $regex: name, $options: "i" };
    if (team) query.team = team;

    const players = await Player.find(query).populate("team", "teamName");
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id)
      .populate("team", "teamName")
      .populate("comments.author", "membername name");
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const Team = require("../models/team.model");

exports.createPlayer = async (req, res) => {
  try {
    const { playerName, image, teamId, isCaptain } = req.body;

    if (!playerName || !teamId) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin cầu thủ hoặc đội" });
    }

    // Kiểm tra teamId có hợp lệ không
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Đội bóng không tồn tại" });
    }

    const newPlayer = new Player({
      playerName,
      image,
      team: teamId,
      isCaptain,
    });

    await newPlayer.save();

    res.status(201).json(newPlayer);
  } catch (err) {
    console.error("Lỗi khi tạo cầu thủ:", err);
    res.status(500).json({ message: "Lỗi server khi tạo cầu thủ" });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const updated = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: "Player deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { rating, content } = req.body;
    const player = await Player.findById(req.params.id);

    if (!player) return res.status(404).json({ message: "Player not found" });

    const hasCommented = player.comments.some(
      (c) => c.author.toString() === req.user.id
    );

    if (hasCommented) {
      return res
        .status(400)
        .json({ message: "You have already commented on this player" });
    }

    player.comments.push({
      rating,
      content,
      author: req.user.id,
    });

    await player.save();
    res.status(201).json({ message: "Comment added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
