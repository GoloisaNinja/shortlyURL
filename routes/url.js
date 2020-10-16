const express = require('express')
const router = express.Router()
const myUrl = require('../models/Url')
const { nanoid } = require('nanoid')


router.get('/search/:searchfor', async (req, res) => {
    // TODO: get a short url by id
    const searchTerm = await req.params.searchfor
    console.log(searchTerm)
    let idcheck = []
    let urlmatches = []
    let slugmatches = []
    let matches = []
    try {
        
        urlmatches = await myUrl.find({ url: new RegExp(searchTerm) }, 'slug url').exec()
        idcheck = new Set(urlmatches.map((arr) => arr.id))
        slugmatches = await myUrl.find({ slug: new RegExp(searchTerm) }, 'slug url').exec()
        matches = [...urlmatches, ...slugmatches.filter((arr) => !idcheck.has(arr.id))]
       
        if (matches.length > 0) {
            //console.log(matches)
            return res.status(200).json(matches)
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