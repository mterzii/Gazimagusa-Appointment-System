const express = require("express");
const { testUserController } = require("../Controllers/testController");

//router Object
const router = express.Router()

//router GET | POST | UPDATE | DELETE
router.get("/test-user", testUserController);

//export

module.exports = router;
  