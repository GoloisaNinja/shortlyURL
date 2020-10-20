const express = require('express')
const router = express.Router()
const myUrl = require('../models/Url')
const { nanoid } = require('nanoid')


router.get('/search', async (req, res) => {
    // TODO: get a short url by id
    const searchTerm = await req.query.searchfor.toLowerCase()
    const page = await parseInt(req.query.page)
    console.log(page)
    const pageSize = 5
    const skip = (page - 1) * pageSize
    let urlmatches = []
    let matches = []
    try {
        totalrecords = await myUrl.find({ $or: [{ 
            url: new RegExp(searchTerm) }, 
            { slug: new RegExp(searchTerm) } ]}, 'slug url').countDocuments()
        urlmatches = await myUrl.find({ $or: [{ 
                url: new RegExp(searchTerm) }, 
                { slug: new RegExp(searchTerm) } ]}, 'slug url')
                .skip(skip)
                .limit(pageSize)
                .sort('-createdAt')
       
        if (urlmatches.length > 0) {
            console.log(totalrecords, pageSize)
            const numPages = Math.ceil(totalrecords / pageSize)
            return res.status(200).json({urlmatches, pages: numPages})
        }
        res.status(404).json({ msg: "search was empties..."})
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

router.get('/:id', async (req, res) => {
    // TODO: redirect to url
    const { id: slug } = req.params
    try {
        const redirectUrl = await myUrl.findOne({ slug })
        if(redirectUrl) {
            console.log(redirectUrl.url)
            return res.redirect(redirectUrl.url)
        }
        res.redirect(`/?error=${slug} not found`)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
    
})

router.post('/url', async (req, res) => {
    // TODO: create a short url
    const data = await req.body
    console.log(data)
    try {
        let { slug, url } = req.body
        console.log(req.body)
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
        res.status(200).json(newURL)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

module.exports = router