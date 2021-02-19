require ('dotenv').config()
const path = require('path')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const userCtrl = require('./controllers/users')
const colCtrl = require('./controllers/collection')
const partyCtrl = require('./controllers/party')
const libCtrl = require('./controllers/library')


const app = express()

app.use(express.json())


app.use(express.static(`${__dirname}/../build`))


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
app.post('/auth/signin', userCtrl.signin)
app.get('/auth/me', userCtrl.getUser)
app.post('/auth/logout', userCtrl.logout)


//collection
app.get('/collection', colCtrl.getCollection)
app.post('/collection/add', colCtrl.addGame)
app.delete('/collection/delete', colCtrl.deleteGame)
app.get('/collection/topgames', colCtrl.getTopGames)

//parties
app.get('/parties', partyCtrl.getParties)
app.post('/parties/create', partyCtrl.createParty)
app.post('/parties/join', partyCtrl.joinParty)
app.delete('/parties/leave/:party_id', partyCtrl.leaveParty)
app.delete('/parties/disband/:party_id', partyCtrl.deleteParty)
app.get('/party/:party_id', partyCtrl.getParty)

//library
app.post('/library/rank', libCtrl.rateGame)
app.get('/library/gameratings/:party_id', libCtrl.getRatings)
app.get('/library/topgames', libCtrl.getTopGames)

app.get('*', (req, res)=>{  res.sendFile(path.join(__dirname, '../build/index.html'));})