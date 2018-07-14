"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {value: true});
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;

class Track {
  /**
   * model: track 생성
   * @param trackData
   * @returns {Promise<void>}
   */
  createTrack(trackData) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query('INSERT INTO tracks SET ?', trackData, function (err) {
            if (err) {
              connection.release();
              reject(err);
            }
            else {
              connection.release();
              resolve(trackData);
            }
          });
        });
      });
    }));
  }

  /**
   * model: track 리스트 조회
   * @returns {Promise<void>}
   */
  listTrack() {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query('SELECT * FROM tracks', function (err, rows) {
            if (err) {
              connection.release();
              reject(err);
            }
            else {
              connection.release();
              resolve(rows);
            }
          });
        });
      });
    }));
  }

  /**
   * model: track page 리스트 조회
   * @param {number} page
   * @param {number} count
   * @returns {Promise<any>}
   */
  pageListTrack(page, count) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          if (page && count) {
            let start = (page - 1) * count;
            if (start < 0) {
              start = 0;
            }
            yield connection.query(`SELECT * FROM tracks ORDER BY trackName ASC LIMIT ${start}, ${count}`, function (err, rows) {
              if (err) {
                connection.release();
                reject(err);
              }
              else {
                connection.release();
                resolve(rows);
              }
            });
          }
          else {
            yield connection.query(`SELECT * FROM tracks ORDER BY trackName`, function (err, rows) {
              if (err) {
                connection.release();
                reject(err);
              }
              else {
                connection.release();
                resolve(rows);
              }
            });
          }
        });
      });
    }));
  }

  /**
   * model: track 삭제
   * @param {string} trackName
   * @returns {Promise<void>}
   */
  deleteTrack(trackName) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query('DELETE FROM tracks WHERE trackName = ?', trackName, function (err, rows) {
            return __awaiter(this, void 0, void 0, function* () {
              if (err) {
                yield connection.release();
                reject(err);
              }
              else {
                yield connection.release();
                resolve(rows);
              }
            });
          });
        });
      });
    }));
  }
}

exports.Track = Track;
exports.track = new Track();
//# sourceMappingURL=track.model.js.map