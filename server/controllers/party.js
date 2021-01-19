module.exports = {

    getParties: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const parties = await db.parties.get_parties(user_id)
        
        const party_members = await Promise.all(parties.map(async (party) => {
            const members = await db.parties.get_party_members(user_id, party.party_id)
            return {...party, members}
            })
        )

        res.status(200).send(party_members)

    },

    getParty: async (req, res) => {
        const db = req.app.get('db')

        const {party_id} = req.params
        const {user_id} = req.session.user

        const party = await db.parties.get_party(party_id)

        const library = await db.library.get_library(party_id)
        
        const inviteKey = await db.parties.get_invite_key(user_id, party_id)

        res.status(200).send({party, library, inviteKey})

        },

    createParty: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {party_name} = req.body

        const inviteKey = () => Math.random().toString(20).substr(2,6)
          

        const [{party_id}] = await db.parties.create_party(party_name, user_id, inviteKey)
        
        await db.parties.create_party_junction(user_id, party_id)

        res.status(200).send('Party created.')
        
    },

    joinParty: async (req, res) => {
        const db = req.app.get('db')

        const {user_id} = req.session.user
        const {inviteKey} = req.body

        const [{party_id}] = await db.parties.check_invite(inviteKey)
        const [is_member] = await db.parties.check_parties(user_id, party_id)

        if(is_member){
            return res.status(409).send('Already a member of this party.')

        }

        if(!party_id){
            return res.status(409).send('Party invite invalid.')
            
        } 

        await db.parties.join_party(user_id, party_id)

        res.status(200).send('Welcome to the party!')
    },

    leaveParty: async (req, res) => {
        const db = req.app.get('db')

        const {user_id} = req.session.user
        const {party_id} = req.params
        console.log(party_id)

        await db.parties.leave_party(user_id, party_id)

        res.status(200).send('You are no longer a member of the party.')

    },

    deleteParty: async (req, res) => {
        const db = req.app.get('db')

        const {party_id} = req.params

        await db.parties.disband_party(party_id)
    }

}