const express = require('express')  
const mongoose = require('mongoose')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const connectDB = require('./config/db')
const myRoutes = require('./routes/url')
const publicPath = path.join(__dirname, './public' )

const app = express()
const port = process.env.PORT || 4000
connectDB()


app.use(express.static('./public'))
app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(myRoutes)






app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})