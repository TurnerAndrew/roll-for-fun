module.exports = {
  getLibrary: async (req, res) => {
    const db = req.app.get("db");
    const { party_id } = req.params;

    const library = await db.library.get_library(party_id);

    res.status(200).send(library);
  },

  rateGame: async (req, res) => {
    const db = req.app.get("db");
    const [game_id, party_id, rank] = req.body;
    const {user_id} = req.session.user

    const rating = await db.library.check_rating(game_id, party_id);

    if (rating) {
      await db.library.update_rating(game_id, party_id, rank);
      return res.status(200).send("Rating updated");
    }

    await db.library.add_rating(game_id, party_id, rank);
    await db.collection.rate_game(game_id, rank, user_id)

    return res.status(200).send("Rating added.");
  },

  getTopGames: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;

    const topGames = await db.library.get_top_games(user_id);

    return res.status(200).send(topGames);
  },

  getTopByParty: async (req, res) => {
    const db = req.app.get('db')
    const {party_id} = req.body

    const topGames = await db.collection.get_top_by_party.sql(party_id)

    return res.status(200).send(topGames)
  }
};
