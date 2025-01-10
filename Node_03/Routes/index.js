import { Router } from "express";
import UserRoutes from "./UserRoute.js"
import CommentRoutes from "./CommentRoute.js"
import PostRoutes from "./PostsRoute.js"


const router = Router();

router.use('/api/user', UserRoutes);
router.use('/api/comment', CommentRoutes);
router.use('/api/post', PostRoutes);

export default router;