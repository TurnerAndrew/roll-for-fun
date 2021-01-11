module.exports = {

    getCollection: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user

        const collection = await db.collection.get_collection([user_id])
        

        res.status(200).send(collection)
    },

    findGame: async (req, res) => {
        const db = req.app.get('db')
        const bga_id = req.body

        const game = await db.collection.find_game([bga_id])

        res.status(200).send(game)
    },

    addGame: async (req, res) => {
        const db = req.app.get('db')
        const {name, id, thumb_url, min_players, max_players, min_playtime, max_playtime, url} = req.body
        const {user_id} = req.session.user

        const [game] = await db.collection.find_game([id])
        
        if(!game) {
            const [newGame] = await db.collection.add_game([name, id, thumb_url, min_players, max_players, min_playtime, max_playtime, url])
            res.status(200).send('Game added successfully.')
        }        
        
        const [{game_id}] = await db.collection.find_game([name])    
    
        await db.collection.add_to_collection([user_id, game_id])
    
        res.status(200).send('Added to collection')
    },
    
    deleteGame: (req, res) => {
        const db = req.app.get('db')
        const {game} = req.body

        db.collection.delete_game(game)

        res.status(200).send('Removed successfully')
    }
}