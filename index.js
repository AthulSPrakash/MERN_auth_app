const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Router = require('./routes')
const app = express()

app.use(cors())

const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 5000

const username = process.env.USER_NAME
const password = process.env.PASSWORD
const cluster = process.env.CLUSTER
const dbname = process.env.DB_NAME

mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

app.use(express.json())

app.use(Router)

app.listen(port,()=>console.log(`Server listening on port ${port}`))