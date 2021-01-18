SELECT * FROM games g
JOIN collection
ON collection.game = g.game_id
WHERE owner = $1 AND g.title ILIKE $2