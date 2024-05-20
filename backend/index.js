const express = require('express')
//const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/checkout', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.lineItems,
            mode: 'payment',
            payment_method_types: ['card'],
            success_url: 'https://localhost:3000/success',
            cancel_url: 'https://localhost:3000'
        })

        return res.status(201).json(session)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// connecting to db
//mongoose.connect(process.env.MONGO_URL)
//    .then(() => console.log('db success'))


// starting server
const port = process.env.PORT || 5000
app.listen(port, () => console.log('Server is running successfully'))