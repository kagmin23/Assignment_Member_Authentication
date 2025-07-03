const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");

// Public GET
router.get("/", auth, teamController.getAllTeams);

// Admin-only
router.post("/", auth, isAdmin, teamController.createTeam);
router.put("/:id", auth, isAdmin, teamController.updateTeam);
router.delete("/:id", auth, isAdmin, teamController.deleteTeam);


module.exports = router;
