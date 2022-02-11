const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Login = require('./routes/login')
const Google = require('./routes/google')
const Register = require('./routes/register')
const UsersList = require('./routes/users')
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
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err))

app.use(express.json())

app.use('/api/gauth', Google)
app.use('/api/login', Login)
app.use('/api/register', Register)
app.use('/api/users', UsersList)

app.listen(port,()=>console.log(`Server listening on port ${port}`))