const Team = require("../models/team.model");

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTeam = async (req, res) => {
  const { teamName } = req.body;
  try {
    const newTeam = await Team.create({ teamName });
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const updated = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Team deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
