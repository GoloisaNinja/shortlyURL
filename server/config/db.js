const mongoose = require('mongoose')
const config = require('config')
require('dotenv').config()
//const devDB = config.get('MONGODB_LOCAL')
const prodDB = MONGODB_URL

const connectDB = async () => {
    try {
        await mongoose.connect(prodDB, {
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