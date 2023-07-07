import asyncHandler from "express-async-handler"
import { validateLogin, validateRegister } from "../validation/userValidator.js"
import parseValidationError from '../utils/parseValidator.js'
import User from '../models/userModel.js'
import Notification from '../models/notificationModel.js'
import Offer from '../models/offerModel.js'
import Rating from '../models/ratingModel.js'
//@desc  GET all user notifications 
//@right  PUBLIC
//@ route GET /api/users/:userId/notification


const getNotification = asyncHandler( async (req,res)=> {
    console.log("request body :",req.body)
    try {
        const notifications = await Notification.find({ userId: req.params.userId });
         res.status(200).json({notifications})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
})

//@desc  get top popular services 
//@right  PUBLIC
//@ route GET  /api/users//services/popular/


const getPopularsServices = asyncHandler( async (req,res)=> {
    console.log("request body :",req.body)
    try {
        const mostDemandingOffers = await Offer.find().sort({reservationNumber : -1}).limit(3)
         res.status(200).json({mostDemandingOffers})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
})


//@desc  get services per type 
//@right  PUBLIC
//@ route  /api/users/services?type=serviceType

const getServices = asyncHandler( async  (req, res) => {
  console.log("params :",req.query)

  try {
    
    // Find the user by email
    const services = await Offer.find().where("type").equals(req.query.type);
     res.status(200).json({ services})
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
})
//@desc  get one service p
//@right  PUBLIC
//@ route  /api/users/services/:serviceId

const getOneService = asyncHandler( async  (req, res) => {
  

  try {
    
   
    const [service,ratings] = await Promise.all([ Offer.findOne({ _id :req.params.serviceId }).populate("userId"), Rating.find({ offer : req.params.serviceId }).limit(4).populate("user")]) 
     res.status(200).json({ service,ratings})
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
})




export {getNotification,getPopularsServices,getServices,getOneService}