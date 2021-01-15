const nodemailer = require('nodemailer')
require ('dotenv').configure()

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

let mailOptions = {
    from: 'andrew@aturner.dev',
    to: req.body.email,
    subject: 'Welcome to Roll For Fun!',
    text: "Thank you for registering with Roll For Fun.  We will take the pain out of deciding what to play at your next game night.  Simply login and create party or join an existing one.  Add the games you own to your collection.  All of your party's games will be in one place - the library.  Vote on your favorites, we'll compile the top 5 and choose randomly.  Voilia!  The decision is made for you.  Enjoy!"
}

transport.sendMail(mailOptions, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Message Sent!')
    }
    }
)