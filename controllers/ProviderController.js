import asyncHandler from "express-async-handler"
import { validateLogin, validateRegister } from "../validation/userValidator.js"
import parseValidationError from '../utils/parseValidator.js'
import User from '../models/userModel.js'
import fs from 'fs'
import Offer from "../models/offerModel.js"
import { validateCreateOffer } from "../validation/providerValidator.js"
import Reservation from "../models/reservationModel.js"
import Notification from "../models/notificationModel.js"
import { notifcationsBase } from "../utils/Variable.js"
import { generateNotificationContentToAnswerReservation } from "../utils/generateText.js"
import mongoose from "mongoose"
import Payment from "../models/paymentModel.js"

//@desc  create a new offer 
//@right  PUBLIC
//@ route  POST /api/providers/offers


const CreateOffer = asyncHandler( async (req,res)=> {
    const { userId,title,description,type,hourRate} = req.body
    console.log("request body :",req.body)
    try {
        const { error } = validateCreateOffer(req.body);
        console.log(error)
        if (error) {
            const errorMessage = parseValidationError(error)
     
         return res.status(400).json({
           message: errorMessage.message,
         });
       }
       
       await Offer.create({
        userId: userId,
        hourRate:  Number(hourRate) ,
        title: title,
        description: description,
        type : Number(type) ,
        photoUrl  : `/uploads/offers/${req.file.filename}`
       })
       res.status(201).json({message: "offer created successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
})
//@desc  modify a  offer 
//@right  PUBLIC
//@ route  PUT /api/providers/offers/:offerId


const modifyOffer = asyncHandler( async (req,res)=> {
    const { title,description,type,hourRate} = req.body
    console.log("request body :",req.body)
    try {
        const offer = await Offer.findById(req.params.offerId)
       offer.type = type || offer.type
       offer.title = title || offer.title
       offer.description = description || offer.description
       offer.hourRate = hourRate ?Number(hourRate) : offer.hourRate
       offer.photoUrl =  req.file ? `/uploads/offers/${req.file.filename}` : offer.photoUrl
      await offer.save()
       res.status(201).json({message: "offer modified successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
})

//@desc  create a new offer 
//@right  PUBLIC
//@ route  GET /api/providers/offers/:userId/users


const getOneOffer = asyncHandler( async (req,res)=> {
    console.log("request body :",req.body)
    try {
       const offer = await Offer.find().where("userId").equals(req.params.userId).limit(1)
       
      console.log(offer)
       res.status(200).json({offer : offer[0] })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
})
//@desc  get reservation 
//@right  PUBLIC
//@ route  GET /api/providers/reservation/:userId/


const getReservations = asyncHandler( async (req,res)=> {
    console.log("request body :",req.body)
    try {
       const reservations = await Reservation.find().where("providerId").equals(req.params.userId).populate("askerId")
       
      console.log(reservations)
       res.status(200).json({reservations })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
})
//@desc  get a new offer 
//@right  PUBLIC
//@ route  GET /api/providers/reservation/:userId/


const answerReservation = asyncHandler( async (req,res)=> {
    console.log("request body :",req.body)
    const {providerName} = req.body
    try {
      const reservation = await Reservation.findById(req.params.reservationId).populate("askerId")
       reservation.status =  req.query.answer === "accept" ? 1 : 3
      await reservation.save()

      // send notfication
      await Notification.create({
        userId : reservation.askerId._id,
        title : notifcationsBase[req.query.answer === "accept"? 0 : 4 ].title,
        type : req.query.answer === "accept" ? 1 :5,
        content : generateNotificationContentToAnswerReservation(reservation.askerId,req.query.answer,reservation.Date,providerName)
       })
       res.status(201).json({message : "reservation answered successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
})
//@desc  get stats 
//@right  PUBLIC
//@ route  GET /api/providers/reservation/:userId/


const getStats = asyncHandler( async (req,res)=> {
    const providerId = req.params.providerId; 
    try {
        //Reservation

   // Aggregate the reservations to calculate the sum per month
   // Get the current year
   const currentYear = new Date().getFullYear();

   // Calculate the start and end dates for the current year
   const startDate = new Date(currentYear, 0, 1); // January 1st of the current year
   const endDate = new Date(currentYear, 11, 31); // December 31st of the current year

   // Find reservations within the specified date range and matching receiverId
   const reservations = await Reservation.find({
     providerId: providerId,
     Date: { $gte: startDate, $lte: endDate },
   });

   // Create an object with all months initialized to 0
   const totalReservationByMonth = [];
   for (let month = 1; month <= 12; month++) {
    totalReservationByMonth[month] = {month , reservationNumber : 0};
   }

   // Calculate the total amount for each month based on the reservations
   reservations.forEach((reservation) => {
     const month = reservation.Date.getMonth() + 1; // 1-indexed month
     totalReservationByMonth[month].reservationNumber += totalReservationByMonth[month].reservationNumber +1 ;
   });
//  Payments
// Get the current year


// Find payments within the specified date range and matching receiverId
const payments = await Payment.find({
  receiverId: providerId,
  Date: { $gte: startDate, $lte: endDate },
});

// Create an object with all months initialized to 0
const totalAmountByMonth = [];
for (let month = 1; month <= 12; month++) {
  totalAmountByMonth[month] = {month : month, amount : 0};
}

// Calculate the total amount for each month based on the payments
payments.forEach((payment) => {
  const month = payment.Date.getMonth() + 1; // 1-indexed month
  totalAmountByMonth[month].amount += payment.amount;
});
       res.status(200).json({ totalReservationByMonth,totalAmountByMonth})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
})





// export {getReservations,ModifyReservation,getStats,CreateOffer,modifyOffer,getOneOffer}
export {CreateOffer,modifyOffer,getOneOffer,getReservations,answerReservation,getStats}