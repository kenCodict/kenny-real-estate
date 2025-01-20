import Video from "../models/video.model.js"
import { errorHandler } from "../utils/error.js"
import { successHandler } from "../utils/success.js"
import { v2 as cloudinary } from "cloudinary";
export const multi = async (req, res, next)=> {
const {imgUrl, videoUrl} = req.body
if (!imgUrl || !videoUrl) {
    res.status(400)
    return next(errorHandler(400, "imgUrl & videoUrl fields are required"))
}
try {
    const video = await Video.create({
        imgUrl,
        videoUrl
    })
    res.status(201).json(successHandler(201,"Created Successfully", video))
} catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    res.status(500)
    next(error)
}
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRETE_KEY,
    secure:true
})

// CLOUDINARY_CLOUDNAME
// CLOUDINARY_API_KEY
// CLOUDINARY_SECRETE_KEY
export const signUpload = async () => {


const {folder} = req.body
if (!folder) {
    res.status(400)
    return next(errorHandler(400, "folder name is required")) 

}
try {
    const timestamp = Math.round((new Date).getTime() / 1000)

    const signature = cloudinary.utils.api_sign_request({
        timestamp,
        folder
    }, process.env.CLOUDINARY_SECRETE_KEY)

    res.status(200).json(successHandler(200, "Signature and Time Stamp fetched Successfully", {timestamp, signature}))
} catch (error) {
 console.log('====================================');
 console.log(error);
 console.log('====================================');   
}

}