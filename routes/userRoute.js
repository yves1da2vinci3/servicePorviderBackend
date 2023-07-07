import { Router } from "express";
import {uploadSingle } from '../middleware/uploadHelper.js'
const router = Router()
import { CreateService, getNotification,getOneService,getPopularsServices, 
    getServices,getMyReservations, getReservationMessages, saveReservationMessages,createPayment, createRating} from '../controllers/userController.js'

router.get('/:userId/notifications',  getNotification);
router.get('/services',  getServices);
router.get('/services/:serviceId',  getOneService);
router.get('/services/popular',  getPopularsServices);
router.post('/services',  CreateService);
router.get('/reservations/:userId',  getMyReservations);
router.get('/reservations/:reservationId/messages',  getReservationMessages);
router.post('/reservations/:reservationId/messages',  saveReservationMessages);
router.post('/offers/:offerId/rating',  createRating);
router.put('/reservation/:reservationId/payment',  createPayment);


export default router