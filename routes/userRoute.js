import { Router } from "express";
import {uploadSingle } from '../middleware/uploadHelper.js'
const router = Router()
import { CreateService, getNotification,getOneService,getPopularsServices, getServices,getMyReservations} from '../controllers/userController.js'

router.get('/:userId/notifications',  getNotification);
router.get('/services',  getServices);
router.get('/services/:serviceId',  getOneService);
router.get('/services/popular',  getPopularsServices);
router.post('/services',  CreateService);
router.get('/reservations/:userId',  getMyReservations);


export default router