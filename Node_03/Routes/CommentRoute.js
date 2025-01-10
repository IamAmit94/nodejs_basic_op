import { Router } from "express";
import { createComment, deleteComment, fetchComment, showComment } from "../Controller/CommentController.js";


const router = Router();


router.get('/',fetchComment);
router.get('/:id',showComment);
router.post('/',createComment);
router.delete('/:id',deleteComment);


export default router;