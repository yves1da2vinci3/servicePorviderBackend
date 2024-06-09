import { Router } from "express";
import {uploadSingle } from '../middleware/uploadHelper.js'
const router = Router()
import {login, register,editUser} from '../controllers/authController.js'

router.post('/register', register);
router.post('/login', login);

router.put('/:userId/edit', editUser);




export default router