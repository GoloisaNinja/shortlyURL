const mongoose = require('mongoose')
const config = require('config')
const MONGODB_URL = process.env.MONGODB_URL

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectDB