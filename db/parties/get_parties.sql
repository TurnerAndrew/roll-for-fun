SELECT party from party_junction pj
JOIN parties p ON pj.party = p.party_id
WHERE pj.member = $1 OR p.leader = $1