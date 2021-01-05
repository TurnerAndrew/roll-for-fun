INSERT INTO parties (party_name, leader, invite_key)
VALUES ($1, $2, $3)
RETURNING party_id;

