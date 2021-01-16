UPDATE TABLE collection
SET rank = $2
WHERE game = $1 AND owner = $3