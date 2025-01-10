import { Router } from "express";
import { createUser, deleteUser, fetchUser, showUser, updateUser } from "../Controller/UserController.js";

const router = Router();

router.get('/', fetchUser);
router.get('/:id', showUser)
router.post('/',createUser);
router.put('/:id', updateUser);
router.delete('/:id',deleteUser);

export default router;