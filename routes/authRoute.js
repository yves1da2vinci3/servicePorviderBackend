import { Router } from "express";
const router = Router()
import {login, register,editUser, updateToken} from '../controllers/authController.js'

router.post('/register', register);
router.post('/login', login);

router.put('/:userId/edit', editUser);
router.put('/:userId/updateToken', updateToken);




export default router