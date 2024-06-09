import asyncHandler from "express-async-handler"
import { validateLogin, validateRegister } from "../validation/userValidator.js"
import parseValidationError from '../utils/parseValidator.js'
import User from '../models/userModel.js'
import Notification from '../models/notificationModel.js'
import Offer from '../models/offerModel.js'
import Rating from '../models/ratingModel.js'
import Reservation from '../models/reservationModel.js'
import Payment from '../models/paymentModel.js'
import Message from '../models/messageModel.js'
import { generateNotificationContent, generateNotificationContentForPayment } from "../utils/generateText.js"
import { notifcationsBase } from "../utils/Variable.js"
import mongoose from "mongoose"
import UserFavourite from "../models/userFavouriteModel.js"
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
//@desc  get My reservations 
//@right  PUBLIC
//@ route GET  /api/users/reservations/:userId

const getMyReservations = asyncHandler( async  (req, res) => {
  

  try {
    

    const reservations = await Reservation.find().where("askerId").equals(req.params.userId).populate("providerId").populate("offerId")
     res.status(200).json({ reservations})
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
})
//@desc  get My Messages from reservation 
//@right  PUBLIC
//@ route GET  /api/users/reservations/:reservationId/messages

const getReservationMessages = asyncHandler( async  (req, res) => {
  

  try {
    

    const messages = await Message.find().where("reservationId").equals(req.params.reservationId).sort({ date : 1})
     res.status(200).json({ messages})
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
})
//@desc  get My Messages from reservation 
//@right  PUBLIC
//@ route GET  /api/users/reservations/:reservationId/messages

const saveReservationMessages = asyncHandler( async  (req, res) => {
  const {senderId,content} = req.body
const message = {
  senderId,
  content,
   reservationId : req.params.reservationId
}
  try {
    
    const io = req.app.get("socketio")

    io.emit("messageSent",{
      reservationId : req.params.reservationId,
      message
    })
   
    await Message.create( message)
     res.status(201).json({ message : "message sent"})
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
})
//@desc  create one service reservation
//@right  PUBLIC
//@ route POST /api/users/services/

const CreateService = asyncHandler( async  (req, res) => {
  const {askerId,location,amount,providerId,startTime,serviceDate,endTime,notificationType,askerName,offerId} =req.body
console.log(req.body)
  try {
    // const { error } = validateCreateOffer(req.body);
    //     console.log(error)
    //     if (error) {
    //         const errorMessage = parseValidationError(error)
     

    //      return res.status(400).json({
    //        message: errorMessage.message,
    //      });
    //    }

       const user = await User.findById(providerId)

     await Reservation.create({
        askerId :askerId,
        location :location,
        providerId : providerId,
        amount : amount,
        startTime : startTime,
        endTime : endTime,
        Date : serviceDate,
        offerId : offerId
       })
       
    // send notfication
      await Notification.create({
        userId : providerId,
        title : notifcationsBase[notificationType].title,
        type : notificationType,
        content : generateNotificationContent(user,askerName)
       })
       res.status(201).json({ message: 'reservation made successfully'})
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
})


//@desc  create payment 
//@right  PUBLIC
//@ route Put /api/users/reservations/:reservationId/payment
const createPayment = asyncHandler(async(req,res)=>{
try {
  const reservation = await Reservation.findById(req.params.reservationId)
  await Payment.create({
      receiverId  : req.body.receiverId,
      senderId : req.body.senderId,
      amount : req.body.amount,
      type : req.body.type
  })
  // change Reservation
  reservation.status = 2
  const offer = await Offer.findById(reservation.offerId)
  offer.reservationNumber = offer.reservationNumber +1
  await offer.save()
  await Notification.create({
    title : notifcationsBase[3].title,
    type : notifcationsBase[3].id,
    userId : req.body.receiverId,
    content : generateNotificationContentForPayment(req.body.askerName,req.body.amount,req.body.providerName)
  })
  await reservation.save() 
  res.status(201).json({message : "Payment made successfully"})
} catch (error) {
  console.log(error)
  res.status(500).json({message : error})
}
})

//@desc  create reating 
//@right  PUBLIC
//@ route Put /api/users/offers/:offerId
const createRating = asyncHandler(async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.offerId);
    await Rating.create({
      comment: req.body.comment,
      rating: req.body.rating,
      user: req.body.userId,
      offer: req.params.offerId,
    });

    // Calculate the sum of ratings and the total number of ratings using aggregation pipeline
    const offerId = req.params.offerId;
    
    const ratings = await Rating.find({ offer: offerId });
    const totalRatings = ratings.length;
    const sumOfRatings = ratings.reduce((accumulator, rating) => accumulator + rating.rating, 0);

   

    offer.rating = (sumOfRatings + req.body.rating) / (totalRatings + 1);

    await offer.save();

    await Notification.create({
      userId : req.body.providerId,
      title: notifcationsBase[1].title,
      type: notifcationsBase[1].id,
      content: `Dear ${req.body.providerName}, you received a ${req.body.rating} stars for the work you did for ${req.body.askerName}.`,
    });

    res.status(201).json({ message: "Rating made successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
//@desc  create reating 
//@right  PUBLIC
//@ route POST /api/users/favourites/:userId
const addFavourite = asyncHandler(async (req, res) => {
  const { offerId} = req.body
  try {
    const userFavorites = await UserFavourite.findOne({ userId : req.params.userId }).populate('Favourites.offer');
    if(!userFavorites) {
      await UserFavourite.create({ userId : req.params.userId, Favourites : [{offer :offerId }]})
    }else{
       userFavorites.Favourites.push({ offer : offerId})
       await userFavorites.save()
    }
  

    res.status(201).json({ message: "favourite made successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//@desc  remove favourite reating 
//@right  PUBLIC
//@ route PUT /api/users/favourites/:userId
const removeFavourite = asyncHandler(async (req, res) => {
  const { offerIds } = req.body;

  try {
    const userFavorites = await UserFavourite.findOne({ userId: req.params.userId });

    userFavorites.Favourites = userFavorites.Favourites.filter(
      (favorite) => !offerIds.includes(favorite.offer._id.toString())
    );

    await userFavorites.save();


    res.status(201).json({ message: "Favourite removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
//@desc  remove favourite reating 
//@right  PUBLIC
//@ route PUT /api/users/favourites/:userId
const getAllFavourites = asyncHandler(async (req, res) => {

  try {
    const userFavorites = await UserFavourite.findOne({ userId: req.params.userId }).populate('Favourites.offer');

    res.status(200).json({ userFavorites });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});



export {getNotification,getPopularsServices,getServices,getOneService,CreateService,getMyReservations,createRating,addFavourite,removeFavourite,getAllFavourites,
  getReservationMessages,saveReservationMessages,createPayment}