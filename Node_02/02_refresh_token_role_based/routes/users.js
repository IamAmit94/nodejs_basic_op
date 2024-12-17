import { Router } from "express";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/roleCheck.js";
import { userDetails, updateRole } from "../controller/usersController.js";
const router = Router();

// router.get("/details", auth, (req, res) => {
	router.get("/details", auth,roleCheck(["admin"]), userDetails);

	router.put('/userName/:userName',updateRole);

export default router;
