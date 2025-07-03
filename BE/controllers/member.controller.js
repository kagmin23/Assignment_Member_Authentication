const Member = require("../models/member.model");
const bcrypt = require("bcryptjs");

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().select("-password");
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSelf = async (req, res) => {
  try {
    const user = await Member.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSelf = async (req, res) => {
  const { name, YOB } = req.body;

  try {
    const user = await Member.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name ?? user.name;
    user.YOB = YOB ?? user.YOB;

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await Member.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password incorrect" });

    const hashedNew = await bcrypt.hash(newPassword, 10);
    user.password = hashedNew;

    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
