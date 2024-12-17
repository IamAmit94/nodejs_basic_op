import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
// import router from "express/lib/router.js";
const router = express.Router();

// Only admin can access this router

router.get("/admin",verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({message: "Welcome Admin"})
});

// Both Admin and Manager can access this router
router.get("/manager",verifyToken, authorizeRoles("admin", "manager"), (req, res) => {
    res.json({message: "Welcome Manager"})
});


// All can access this router
router.get("/user", authorizeRoles("admin", "manager", "user"), (req, res) => {
    res.json({message: "Welcome user"})
})

export default router;