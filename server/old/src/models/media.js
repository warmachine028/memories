import mongoose, { Schema } from 'mongoose'

const mediaSchema = Schema({
    image: String
})

export default mongoose.model('media', mediaSchema)