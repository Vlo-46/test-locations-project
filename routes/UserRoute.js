import {Router} from 'express';
import {authMiddleware} from "../middlewares/AuthMiddleware.js";
import {createUser, deleteUser, getAllUsers, getUserById, updateUser} from "../controllers/UserController.js";

const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;