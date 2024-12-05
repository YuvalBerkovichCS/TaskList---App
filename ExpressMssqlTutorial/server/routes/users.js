const express = require("express");
const router = express.Router();
const { sql } = require("../db");

// GET /api/users
router.get("/", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Users");
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error retrieving users");
  }
});

// GET /api/users/:userid
router.get("/:userid", async (req, res) => {
  const { UserID } = req.body;
  try {
    const request = new sql.Request();
    const result = await request
      .input("UserID", sql.Int, UserID)
      .query("SELECT * FROM Users WHERE UserID = @UserID");

    if (result.recordset.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(200).json(result.recordset[0]);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error retrieving user");
  }
});

module.exports = router;
