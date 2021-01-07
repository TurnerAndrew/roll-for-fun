INSERT INTO users (username, email, first_name, last_name, hash, profile_pic)
    VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;