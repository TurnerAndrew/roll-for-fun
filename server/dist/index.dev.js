"use strict";

require('dotenv').config();

var path = require('path');

var _process$env = process.env,
    SERVER_PORT = _process$env.SERVER_PORT,
    CONNECTION_STRING = _process$env.CONNECTION_STRING,
    SESSION_SECRET = _process$env.SESSION_SECRET;

var express = require('express');

var massive = require('massive');

var session = require('express-session');

var userCtrl = require('./controllers/users');

var colCtrl = require('./controllers/collection');

var partyCtrl = require('./controllers/party');

var libCtrl = require('./controllers/library');

var app = express();
app.use(express.json());
app.use(express["static"]("".concat(__dirname, "/../build"))); //session/cookies

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10
  }
})); //db connection

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(function (dbInstance) {
  app.set('db', dbInstance);
  console.log('DB Ready');
  app.listen(SERVER_PORT, function () {
    console.log("Running on ".concat(SERVER_PORT));
  });
}); //endpoints
//auth

app.post('/auth/register', userCtrl.register);
app.post('/auth/signin', userCtrl.signin);
app.get('/auth/me', userCtrl.getUser);
app.post('/auth/logout', userCtrl.logout); //collection

app.get('/collection', colCtrl.getCollection);
app.post('/collection/add', colCtrl.addGame);
app["delete"]('/collection/delete', colCtrl.deleteGame);
app.get('/collection/topgames', colCtrl.getTopGames); //parties

app.get('/parties', partyCtrl.getParties);
app.post('/parties/create', partyCtrl.createParty);
app.post('/parties/join', partyCtrl.joinParty);
app["delete"]('/parties/leave/:party_id', partyCtrl.leaveParty);
app["delete"]('/parties/disband/:party_id', partyCtrl.deleteParty);
app.get('/party/:party_id', partyCtrl.getParty); //library

app.post('/library/rank', libCtrl.rateGame);
app.get('/library/gameratings/:party_id', libCtrl.getRatings);
app.get('/library/topgames', libCtrl.getTopGames);
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});