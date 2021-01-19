DELETE FROM party_junction pj
USING parties p
WHERE p.party_id = pj.party AND p.party_id = $1;

DELETE FROM parties p
WHERE p.party_id = $1