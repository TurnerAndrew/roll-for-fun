-- get all games from every member of the party

-- find all members of party passed in from the body
-- get collection for all members

-- collections are stored on collection table

-- party_junction holds party members

SELECT * FROM collection
WHERE owner = $1 OR ()