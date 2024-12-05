const express = require("express");
const router = express.Router();
const { sql } = require("../db");

//api/tasks
router.get("/", async (req, res) => {
  try {
    const result = await sql.query(`
      SELECT 
        Tasks.TaskID,
        Tasks.TaskName,
        Tasks.TaskDescription,
        Users.UserName
      FROM 
        Tasks
      INNER JOIN 
        Users
      ON 
        Tasks.UserID = Users.UserID
    `);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error retrieving tasks");
  }
});

//GET api/tasks/user/:userid
router.get("/user/:userid", async (req, res) => {
  const { UserID } = req.body;
  try {
    const request = new sql.Request();
    request.input("UserID", sql.Int, UserID);
    const result = await request.query(`
      SELECT 
        Tasks.TaskID,
        Tasks.TaskName,
        Tasks.TaskDescription,
        Users.UserName
      FROM 
        Tasks
      INNER JOIN 
        Users
      ON 
        Tasks.UserID = Users.UserID
      WHERE 
        Tasks.UserID = @UserID
    `);

    if (result.recordset.length === 0) {
      return res.status(404).send("No tasks found for this user.");
    }

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error retrieving tasks for the user.");
  }
});

//POST api/tasks
router.post("/", async (req, res) => {
  const { TaskName, TaskDescription, UserID } = req.body;
  try {
    const request = new sql.Request();
    const result = await request
      .input("UserID", sql.Int, UserID)
      .input("TaskName", sql.NVarChar, TaskName)
      .input("TaskDescription", sql.NVarChar, TaskDescription || null).query(`
                INSERT INTO Tasks (TaskName, TaskDescription, UserID)
                OUTPUT INSERTED.TaskID
                VALUES (@TaskName, @TaskDescription,@UserID)
            `);
    res.status(201).json(result.recordset[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error adding task");
  }
});

module.exports = router;
