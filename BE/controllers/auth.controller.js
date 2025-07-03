const Member = require("../models/member.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { membername, password, name, YOB } = req.body;

    const exists = await Member.findOne({ membername });
    if (exists)
      return res.status(400).json({ message: "Member already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMember = new Member({
      membername,
      password: hashedPassword,
      name,
      YOB,
      isAdmin: false,
    });

    await newMember.save();
    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { membername, password } = req.body;

    const user = await Member.findOne({ membername });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, isAdmin: user.isAdmin },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};