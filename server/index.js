require ('dotenv').config()
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const userCtrl = require('./controllers/users')
const colCtrl = require('./controllers/collection')
const partyCtrl = require('./controllers/party')


const app = express()

app.use(express.json())

//session/cookies
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10
    }
}))

//db connection
massive ({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then((dbInstance => {
    app.set('db', dbInstance)
    console.log('DB Ready')
    app.listen(SERVER_PORT, () => {
    console.log(`Running on ${SERVER_PORT}`)
    })
}))

//endpoints

//auth
app.post('/auth/register', userCtrl.register)
app.post('/auth/signin', userCtrl.signin, userCtrl.getUser)
app.get('/auth/me', userCtrl.getUser)
app.post('/auth/logout', userCtrl.logout)


//collection
app.get('/collection', colCtrl.getCollection)
app.post('/collection/add', colCtrl.addGame)
app.delete('/collection/delete', colCtrl.deleteGame)

//parties
app.get('/parties', partyCtrl.getParties)
app.post('/parties/create', partyCtrl.createParty)
app.post('/parties/join', partyCtrl.joinParty)
app.delete('/parties/leave', partyCtrl.leaveParty)

//library
// app.get('/party/:id', libCtrl.getLibrary)