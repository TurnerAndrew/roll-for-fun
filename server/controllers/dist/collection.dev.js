"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = {
  getCollection: function getCollection(req, res) {
    var db, user_id, _req$query$search, search, collection;

    return regeneratorRuntime.async(function getCollection$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = req.app.get('db');
            user_id = req.session.user.user_id;
            _req$query$search = req.query.search, search = _req$query$search === void 0 ? '' : _req$query$search;
            _context.next = 5;
            return regeneratorRuntime.awrap(db.collection.get_collection([user_id, "%".concat(search, "%")]));

          case 5:
            collection = _context.sent;
            return _context.abrupt("return", res.status(200).send(collection));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  getTopGames: function getTopGames(req, res) {
    var db, user_id, topGames;
    return regeneratorRuntime.async(function getTopGames$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            db = req.app.get('db');
            user_id = req.session.user.user_id;
            _context2.next = 4;
            return regeneratorRuntime.awrap(db.collection.get_top_games(user_id));

          case 4:
            topGames = _context2.sent;
            return _context2.abrupt("return", res.status(200).send(topGames));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  findGame: function findGame(req, res) {
    var db, bga_id, game;
    return regeneratorRuntime.async(function findGame$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            db = req.app.get('db');
            bga_id = req.body;
            _context3.next = 4;
            return regeneratorRuntime.awrap(db.collection.find_game([bga_id]));

          case 4:
            game = _context3.sent;
            res.status(200).send(game);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  addGame: function addGame(req, res) {
    var db, _req$body, name, id, thumb_url, min_players, max_players, min_playtime, max_playtime, url, user_id, _ref, _ref2, game, _ref3, _ref4, newGame, _ref5, _ref6, game_id;

    return regeneratorRuntime.async(function addGame$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            db = req.app.get('db');
            _req$body = req.body, name = _req$body.name, id = _req$body.id, thumb_url = _req$body.thumb_url, min_players = _req$body.min_players, max_players = _req$body.max_players, min_playtime = _req$body.min_playtime, max_playtime = _req$body.max_playtime, url = _req$body.url;
            user_id = req.session.user.user_id;
            _context4.next = 5;
            return regeneratorRuntime.awrap(db.collection.find_game([id]));

          case 5:
            _ref = _context4.sent;
            _ref2 = _slicedToArray(_ref, 1);
            game = _ref2[0];
            console.log(game);

            if (game) {
              _context4.next = 17;
              break;
            }

            _context4.next = 12;
            return regeneratorRuntime.awrap(db.collection.add_game([name, id, thumb_url, min_players, max_players, min_playtime, max_playtime, url]));

          case 12:
            _ref3 = _context4.sent;
            _ref4 = _slicedToArray(_ref3, 1);
            newGame = _ref4[0];
            console.log(newGame);
            return _context4.abrupt("return", res.status(200).send('Game added successfully.'));

          case 17:
            _context4.next = 19;
            return regeneratorRuntime.awrap(db.collection.find_game([id]));

          case 19:
            _ref5 = _context4.sent;
            _ref6 = _slicedToArray(_ref5, 1);
            game_id = _ref6[0].game_id;
            _context4.next = 24;
            return regeneratorRuntime.awrap(db.collection.add_to_collection([user_id, game_id]));

          case 24:
            res.status(200).send('Added to collection');

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  deleteGame: function deleteGame(req, res) {
    var db, game_id, user_id;
    return regeneratorRuntime.async(function deleteGame$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            db = req.app.get('db');
            game_id = req.body.game_id;
            user_id = req.session.user.user_id;
            console.log(game_id, user_id);
            _context5.next = 6;
            return regeneratorRuntime.awrap(db.collection.delete_game(game_id, user_id));

          case 6:
            res.status(200).send('Removed successfully');

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};