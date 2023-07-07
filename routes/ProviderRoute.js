import { Router } from "express";
import {uploadSingle } from '../middleware/uploadHelper.js'
const router = Router()
import { CreateOffer, getOneOffer, modifyOffer} from '../controllers/ProviderController.js'

router.post('/offers', uploadSingle("./uploads/offers/"), CreateOffer);
router.put('/offers/:offerId', uploadSingle("./uploads/offers/"), modifyOffer);
router.get('/offers/:userId/users', getOneOffer);





export default router