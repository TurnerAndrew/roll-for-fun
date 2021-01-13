SELECT p.party_name FROM parties p
JOIN party_junction pj ON pj.party = p.party_id
WHERE pj.member = $1 OR p.leader = $1