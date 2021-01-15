const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
require ('dotenv').config()

module.exports = {

    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, email, first_name, last_name, password} = req.body
        const profile_pic = `https://avatars.dicebear.com/4.5/api/identicon/${username}.svg`
        const [existingUser] = await db.user.find_user([username])

        if(existingUser) {
            return res.status(409).send('User already exists, try another username or sign in.')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [newUser] = await db.user.sign_up([username, email, first_name, last_name, hash, profile_pic])

        req.session.user = newUser

        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        
        let mailOptions = {
            from: 'andrew@aturner.dev',
            to: email,
            subject: 'Welcome to Roll For Fun!',
            text: "Thank you for registering with Roll For Fun.  We will take the pain out of deciding what to play at your next game night.  Simply login and create party or join an existing one.  Add the games you own to your collection.  All of your party's games will be in one place - the library.  Vote on your favorites, we'll compile the top 5 and choose randomly.  Voilia!  The decision is made for you.  Enjoy!"
        }
        
        transport.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log(err)
            }})        

        res.status(200).send(newUser)
    },

    signin: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const [existingUser] = await db.user.find_user([username])

        if (!existingUser) {
            return res.status(404).send('Username not found, please try again or register.')
        }

        const isAuthenticated = await bcrypt.compareSync(password, existingUser.hash)
        
        if(!isAuthenticated){
            return res.status(403).send('Incorrect password')
        }
        
        delete existingUser.hash

        req.session.user = existingUser

        res.status(200).send(existingUser)
    },

    getUser: (req, res) => {
        const {user} = req.session
        if(user) {
            return res.status(200).send(user)
        } else {
            res.status(401)
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }



}