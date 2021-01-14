SELECT pj.party, u.username, u.user_id FROM party_junction pj
JOIN users u ON pj.member = u.user_id
WHERE pj.party = $2 AND member <> $1