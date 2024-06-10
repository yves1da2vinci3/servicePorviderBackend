import { Router } from "express";
import {uploadSingle } from '../middleware/uploadHelper.js'
const router = Router()
import { CreateService, getNotification,getOneService,getPopularsServices,getAllFavourites,
    getServices,getMyReservations, getReservationMessages, saveReservationMessages,createPayment, createRating, addFavourite, removeFavourite,
    markAsReadMessage} from '../controllers/userController.js'

router.get('/:userId/notifications',  getNotification);
router.get('/services',  getServices);
router.get('/services/popular',  getPopularsServices);
router.get('/services/:serviceId',  getOneService);
router.post('/services',  CreateService);
router.get('/reservations/:userId',  getMyReservations);
router.get('/reservations/:reservationId/messages',  getReservationMessages);
router.post('/reservations/:reservationId/messages',  saveReservationMessages);
router.put('/reservations/:reservationId/messages/:id/read',  markAsReadMessage);
router.post('/offers/:offerId/rating',  createRating);
router.put('/reservation/:reservationId/payment',  createPayment);
router.get('/favourites/:userId',  getAllFavourites);
router.post('/favourites/:userId',  addFavourite);
router.put('/favourites/:userId',  removeFavourite);


export default router