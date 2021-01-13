SELECT p.party_name, u.username, u.first_name, u.last_name FROM parties p
JOIN party_junction pj ON pj.party = p.party_id
JOIN users u ON pj.member = u.user_id OR p.leader = u.user_id
WHERE pj.member = $1 OR p.leader = $1