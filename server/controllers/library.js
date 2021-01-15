module.exports = {
    
    getLibrary: async (req, res) => {
        const db = req.app.get('db')
        const {party_id} = req.params
        
        const library = await db.library.get_library(party_id)

        res.status(200).send(library)
    }
}