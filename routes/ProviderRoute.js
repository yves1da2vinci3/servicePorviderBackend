import { Router } from "express";
const router = Router()
import { CreateOffer, getOneOffer, modifyOffer,getReservations, answerReservation,getStats} from '../controllers/ProviderController.js'
import { getReservationMessages, markAsReadMessage, saveReservationMessages } from "../controllers/userController.js";

router.post('/offers', CreateOffer);
router.put('/offers/:offerId', modifyOffer);
router.get('/offers/:userId/users', getOneOffer);
router.get('/reservations/:userId', getReservations);
router.put('/reservations/:reservationId', answerReservation);
router.get('/reservations/:reservationId/messages',  getReservationMessages);
router.post('/reservations/:reservationId/messages',  saveReservationMessages);
router.put('/reservations/:reservationId/messages/:id/read',  markAsReadMessage);
router.get('/stats/:providerId',  getStats);





export default router