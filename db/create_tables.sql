-- CREATE TABLE users (
--   user_id serial primary key,
--   username varchar(256),
--   first_name varchar(128),
--   last_name varchar(128),
--   hash varchar(256)
-- );

-- CREATE TABLE games (
--   game_id serial primary key,
--   title varchar(256),
--   bga_id int,
--   thumbnail varchar(256)
-- );

-- CREATE TABLE parties (
--   party_id SERIAL PRIMARY key,
--   party_name VARCHAR(256),
--   member INT REFERENCES users(user_id),
--   leader INT REFERENCES users(user_id)
-- );

-- CREATE TABLE party_junction (
--   pj_id SERIAL PRIMARY KEY,
--   party INT REFERENCES parties(party_id),
--   member INT REFERENCES users(user_id)
-- );

-- CREATE TABLE library (
--   library_id serial PRIMARY KEY,
--   party INT REFERENCES parties(party_id),
--   collection INT REFERENCES collection(collection_id)
-- );