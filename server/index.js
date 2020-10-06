const express = require('express')  
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const app = express()
const port = process.env.PORT || 4000

app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.static('./public'))

app.get('/url/:id', (req, res) => {
    // TODO: get a short url by id
})

app.get('/:id', (req, res) => {
    // TODO: redirect to url
})

app.post('/url', (req, res) => {
    // TODO: create a short url
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})