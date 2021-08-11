module.exports = {

    getCollection: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {search = ''} = req.query
        

        const collection = await db.collection.get_collection([user_id, `%${search}%`])        

        return res.status(200).send(collection)
    },

    getTopGames: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user

        const topGames = await db.collection.get_top_games(user_id)

        return res.status(200).send(topGames)
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

        let [game] = await db.collection.find_game([id])
        
        if(!game) {
        game = await db.collection.add_game([name, id, thumb_url, min_players, max_players, min_playtime, max_playtime, url])
        return res.status(200).send('Game added successfully.')
        }        
        
        console.log(game)

        const [{game_id}] = await db.collection.find_game([id])    
    
        await db.collection.add_to_collection([user_id, game_id])
    
        res.status(200).send('Added to collection')
    },
    
    deleteGame: async (req, res) => {
        const db = req.app.get('db')
        const {game_id} = req.body
        const {user_id} = req.session.user

        console.log(game_id, user_id)

        await db.collection.delete_game(game_id, user_id)

        res.status(200).send('Removed successfully')
    }
}