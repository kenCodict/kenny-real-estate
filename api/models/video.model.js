import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
    required:true,
    },
    videoUrl: {
        type: String,
    required:true,
    },

}, {
    timestamps:true,
})
const Video = mongoose.model('Video', videoSchema)
export default Video