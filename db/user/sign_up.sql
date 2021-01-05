INSERT INTO users (username, first_name, last_name, hash, bga_username, profile_pic)
    VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;