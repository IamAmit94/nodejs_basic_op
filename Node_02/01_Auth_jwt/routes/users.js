
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {userRegister, userDetails, userLogin} = require('../controller/user-controller');

// user Registration
router.post("/", userRegister);

// Fetch the user details
router.get("/me", auth, userDetails);

// user login 
router.post("/login", userLogin);

module.exports = router;
// export default router;