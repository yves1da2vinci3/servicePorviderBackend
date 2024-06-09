import { Router } from "express";
const router = Router()
import UploadService from "../services/uploadService.js";


const uploadService = new UploadService() 

// This method will save a "photo" field from the request as a file.
router.post('/single',(req,res,next)=>  uploadService.uploadSingle(req,res,next) );

// upload multiple files

router.post('/multiple',(req,res,next) => uploadService.uploadMultiple(req,res,next) );

export default router