const mongoose = require('mongoose')
const validator = require('validator')

const URLSchema = new mongoose.Schema({
    slug: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            let re = /^[a-z0-9_-]+$/
            if(!re.test(value)) {
                console.log(value)
                throw new Error('Invalid Slug')
            }
        }
    },
    url: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if(!validator.isURL(value, { require_protocol: true, require_valid_protocol: true })) {
                throw new Error('Must be valid URL')
            } 
        }
    }
})

const myUrl = mongoose.model('myUrl', URLSchema)
module.exports = myUrl