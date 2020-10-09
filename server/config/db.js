const mongoose = require('mongoose')
const config = require('config')
const devDB = config.get('MONGODB_LOCAL')

const connectDB = async () => {
    try {
        await mongoose.connect(devDB, {
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