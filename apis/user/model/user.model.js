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
const encryption_util_1 = require("../../../packages/utils/encryption.util");
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;

class User {
  constructor() {
  }

  /**
   * model: user 생성
   * @param userData
   * @returns {Promise<any>}
   */
  createUser(userData) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query(`INSERT INTO user SET ?`, [userData], function (err) {
            if (err) {
              connection.release();
              reject(err);
            }
            else {
              connection.release();
              resolve(userData);
            }
          });
        });
      });
    }));
  }

  /**
   * model: userLog 생성
   * @param userLogData
   * @returns {Promise<any>}
   */
  createUserLog(userLogData) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query(`INSERT INTO userLog SET ?`, [userLogData], function (err) {
            if (err) {
              connection.release();
              reject(err);
            }
            else {
              connection.release();
              resolve(userLogData);
            }
          });
        });
      });
    }));
  }

  /**
   * model: user 리스트 조회
   * @returns {Promise<any>}
   */
  listUser() {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query(`SELECT * FROM user`, function (err, rows) {
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
   * model: user page 리스트 조회
   * @returns {Promise<any>}
   */
  pageListUser(page, count) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          let start = (page - 1) * count;
          if (start < 0) {
            start = 0;
          }
          yield connection.query(`SELECT * FROM user ORDER BY userIndex ASC LIMIT ${start}, ${count}`, function (err, rows) {
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
   * model: user userId 조회
   * @param {number} userId
   * @returns {Promise<any>}
   */
  getUser(userId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query(`SELECT * FROM user WHERE userId = ?`, [userId], function (err, rows) {
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
   * model: user 업데이트
   * @param {number} userId
   * @param userData
   * @returns {Promise<any>}
   */
  updateUser(userId, userData) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query(`UPDATE user SET ? WHERE userId = ?`, [userData, userId], function (err, rows) {
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
   * model: user 비밀번호 조회
   * @param {string} userId
   * @param userPw
   * @returns {Promise<any>}
   */
  getUserPassword(userId, userPw) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query(`SELECT * from user WHERE userId = ?`, [userId], function (err, rows) {
            return __awaiter(this, void 0, void 0, function* () {
              if (err) {
                connection.release();
                reject(err);
              }
              else {
                if (rows[0].userPw === (yield encryption_util_1.encriptionPw.getHash(userPw))) {
                  connection.release();
                  resolve(rows);
                }
                else {
                  yield connection.release();
                  return reject('The password is incorrect');
                }
              }
            });
          });
        });
      });
    }));
  }

  /**
   * model: user 비밀번호 업데이트
   * @param {string} userId
   * @param userPw
   * @returns {Promise<any>}
   */
  updateUserPassword(userId, userPw) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          userPw = encryption_util_1.encriptionPw.getHash(userPw);
          yield connection.query(`UPDATE user SET userPw=? WHERE userId=?`, [userPw, userId], function (err, rows) {
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
   * model: user 삭제
   * @param {number} userId
   * @returns {Promise<any>}
   */
  deleteUser(userId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query(`DELETE FROM user WHERE userId = ?`, userId, function (err, rows) {
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
   * model: 인증여부 업데이트
   * @param {string} userId
   * @returns {Promise<any>}
   */
  updateIsValidation(userId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
        yield connection.query(`UPDATE user set isValidation='${1}' WHERE userId=?`, [userId], (err, rows) => {
          connection.release();
          if (err) {
            reject(err);
          }
          else {
            resolve(rows);
          }
        });
      }));
    }));
  }

  /**
   * model: 인증기간 검증
   * @param year
   * @param month
   * @param day
   * @returns {boolean}
   */
  isValidOnData(uvUpdatedAt) {
    uvUpdatedAt = JSON.stringify(uvUpdatedAt);
    uvUpdatedAt = uvUpdatedAt.split('"')[3];
    let uvDate = uvUpdatedAt.split('T')[0].split('-');
    let year = parseInt(uvDate[0]);
    let month = parseInt(uvDate[1]);
    let day = parseInt(uvDate[2]);
    let date = new Date();
    let curYear = date.getFullYear();
    let curMonth = date.getMonth() + 1;
    let curDay = date.getDate();
    let diffYear = curYear - year;
    let diffMonth = curMonth - month;
    let diffDay = curDay - day;
    if (diffYear == 1 && curMonth == 1 && curDay == 1) {
      return true;
    }
    if (diffYear == 0) {
      if (diffMonth == 1 && curDay == 1) {
        return true;
      }
      if (diffMonth == 0 && diffDay <= 1) {
        return true;
      }
    }
    return false;
  }
}

exports.User = User;
exports.user = new User();
//# sourceMappingURL=user.model.js.map