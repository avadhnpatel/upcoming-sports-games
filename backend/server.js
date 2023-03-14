require('dotenv').config()

const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const userteamRoutes = require('./routes/userteams')
const userRoutes = require('./routes/user')
const contactformRoutes = require('./routes/contactform')

//express app
const app = express()

//middleware
app.use(cors());
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/userteams' , userteamRoutes)
app.use('/api/user' , userRoutes)
app.use('/api/contactform', contactformRoutes)

//connect to db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, ()=>{
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })



