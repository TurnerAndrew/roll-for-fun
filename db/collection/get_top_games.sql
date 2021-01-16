SELECT * FROM games
JOIN collection
ON collection.game = games.game_id
WHERE owner = $1
ORDER BY rank ASC
LIMIT 5