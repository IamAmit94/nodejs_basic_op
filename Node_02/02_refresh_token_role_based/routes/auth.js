import { Router } from "express";
import {userSignup, userLogin} from "../controller/authController.js";
const router = Router();


router.post("/signUp", userSignup);  // signup
router.post("/logIn",userLogin); // login

export default router;
