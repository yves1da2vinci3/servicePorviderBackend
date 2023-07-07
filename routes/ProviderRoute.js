import { Router } from "express";
import {uploadSingle } from '../middleware/uploadHelper.js'
const router = Router()
import { CreateOffer, getOneOffer, modifyOffer,getReservations, answerReservation} from '../controllers/ProviderController.js'

router.post('/offers', uploadSingle("./uploads/offers/"), CreateOffer);
router.put('/offers/:offerId', uploadSingle("./uploads/offers/"), modifyOffer);
router.get('/offers/:userId/users', getOneOffer);
router.get('/reservations/:userId', getReservations);
router.put('/reservations/:reservationId', answerReservation);





export default router