const express = require("express");
const tasks = require("./tasks");
const users = require("./users");

const router = express.Router();

router.use("/tasks", tasks);
router.use("/users", users);

module.exports = router;
