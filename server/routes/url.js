const express = require('express')
const router = express.Router()
const myUrl = require('../models/Url')
const { nanoid } = require('nanoid')


router.get('/url/:id', (req, res) => {
    // TODO: get a short url by id
})

router.get('/:id', async (req, res) => {
    // TODO: redirect to url
    const { id: slug } = req.params
    try {
        const redirectUrl = await myUrl.findOne({ slug })
        if(!redirectUrl) {
            return res.redirect(`/?error=${slug} not found`)
        }
        //res.redirect(url)
        console.log(redirectUrl.url)
        res.redirect(redirectUrl.url)
        
    } catch (error) {
        res.redirect(`/?error=Link not found`)
    }
    
})

router.post('/url', async (req, res) => {
    // TODO: create a short url
    
    try {
        let { slug, url } = req.body
        if (!slug) {
            slug = nanoid(5)
        } else {
            const existing = await myUrl.findOne({ slug })
            if (existing) {
                throw new Error('Slug already in use...')
        }
    }
    const newURL = new myUrl({
        slug,
        url
    })
        await newURL.save()
        res.status(200).send(newURL)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

module.exports = router