SELECT p.party_id, p.party_name, u.username FROM parties p
JOIN party_junction pj ON pj.party = p.party_id
JOIN users u ON u.user_id = pj.member
WHERE p.party_id = $1;