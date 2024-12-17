// const express = require("express");
// const { register, login } = require("../controllers/authController");

import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// module.export = router;

export default router;
