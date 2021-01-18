UPDATE rating
SET score = $3
WHERE game = $1 AND party = $2 AND "user" = $4
