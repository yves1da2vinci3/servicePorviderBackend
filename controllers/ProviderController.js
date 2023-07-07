import asyncHandler from "express-async-handler"
import { validateLogin, validateRegister } from "../validation/userValidator.js"
import parseValidationError from '../utils/parseValidator.js'
import User from '../models/userModel.js'
import fs from 'fs'
import Offer from "../models/offerModel.js"
import { validateCreateOffer } from "../validation/providerValidator.js"

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





// export {getReservations,ModifyReservation,getStats,CreateOffer,modifyOffer,getOneOffer}
export {CreateOffer,modifyOffer,getOneOffer}