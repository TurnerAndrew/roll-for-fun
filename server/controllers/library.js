module.exports = {
    
    getLibrary: async (req, res) => {
        const db = req.app.get('db')
        const {party_id} = req.params
        
        const library = await db.library.get_library(party_id)

        res.status(200).send(library)
    },

    rateGame: async (req, res) => {
        const db = req.app.get('db')
        const {party_id, game, score} = req.body

        const rating = await db.library.check_rating(game, party_id)
        
        if(rating){
            await db.library.update_rating(game, party_id, score)
            return res.status(200).send('Rating updated')
        }

        await db.library.add_rating(game, party_id, score)

        return res.status(200).send('Rating added.')
    }
}