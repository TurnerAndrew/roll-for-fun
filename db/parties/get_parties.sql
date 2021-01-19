SELECT p.party_name, p.party_id, pj.pj_id, p.leader FROM party_junction pj
JOIN parties p ON pj.party = p.party_id
WHERE member = $1
