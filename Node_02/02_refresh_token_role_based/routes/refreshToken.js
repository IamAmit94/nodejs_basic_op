import { Router } from "express";
import { accessToken, logout } from "../controller/refreshTokenController.js";

const router = Router();

router.post("/", accessToken); // get new access token
router.delete("/",logout); // logout

export default router;
