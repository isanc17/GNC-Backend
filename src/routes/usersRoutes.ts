import { Router } from 'express';
import {
    getUsuariosByStatus,
    getUsuarios, 
    createUser
} from '../controllers/usersController';

const router = Router();

router.get('/:status', getUsuariosByStatus);
router.get('/', getUsuarios);
router.post('/', createUser);

export default router;
