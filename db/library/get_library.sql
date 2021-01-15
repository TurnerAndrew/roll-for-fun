SELECT p.party_name, p.party_id, pj.pj_id, pj.member, g.title, g.bga_id, g.thumbnail, g.min_players, g.max_players, g.max_playtime, g.url, g.game_id  FROM party_junction pj
JOIN parties p ON pj.party = p.party_id
JOIN collection c ON pj.member = c.owner
JOIN games g ON c.game = g.game_id
WHERE party_id = $1