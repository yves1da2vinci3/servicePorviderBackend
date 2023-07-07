import { Router } from "express";
import {uploadSingle } from '../middleware/uploadHelper.js'
const router = Router()
import { getNotification,getOneService,getPopularsServices, getServices} from '../controllers/userController.js'

router.get('/:userId/notifications',  getNotification);
router.get('/services',  getServices);
router.get('/services/:serviceId',  getOneService);
router.get('/services/popular',  getPopularsServices);


export default router