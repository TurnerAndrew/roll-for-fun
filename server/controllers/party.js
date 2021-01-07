module.exports = {

    getParties: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const parties = await db.parties.get_parties(user_id)

        res.status(200).send(parties)
    },

    createParty: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {name} = req.body

        const inviteKey = () => Math.random().toString(20).substr(2,6)
          

        const [{party_id}] = await db.parties.create_party(name, user_id, inviteKey)
        
        await db.parties.create_party_junction(user_id, party_id)

        res.status(200).send('Party created.')
        
    },

    joinParty: async (req, res) => {
        const db = req.app.get('db')

        const {user_id} = req.session.user
        const {inviteKey} = req.body

        const [{party_id}] = await db.parties.check_invite(inviteKey)

        if(!party_id){
            res.status(409).send('Party invite invalid.')
        } 

        await db.parties.join_party(user_id, party_id)

        res.status(200).send('Welcome to the party!')
    },

    leaveParty: async (req, res) => {
        const db = req.app.get('db')

        const {user_id} = req.session.user
        const {party} = req.body

        await db.leave_party(user_id, party)

        res.status(200).send('You are no longer a member of the party.')

    }

}