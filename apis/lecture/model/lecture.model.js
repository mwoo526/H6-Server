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

class Lecture {
  /**
   * model: lecture 생성
   * @param lectureData
   * @returns {Promise<any>}
   */
  createLecture(lectureData) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query('INSERT INTO lectures SET ?', lectureData, function (err) {
            if (err) {
              connection.release();
              reject(err);
            }
            else {
              connection.release();
              resolve(lectureData);
            }
          });
        });
      });
    }));
  }

  /**
   * model: lecture 리스트 조회
   * @returns {Promise<any>}
   */
  listLecture() {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query('SELECT * FROM lectures', function (err, rows) {
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
   * model: lecture index 조회
   * @param {number} lectureIndex
   * @returns {Promise<any>}
   */
  getLectureByLectureIndex(lectureIndex) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query('SELECT * FROM lectures WHERE lectureIndex = ?', lectureIndex, function (err, rows) {
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
   * model: lecture lectureCode 조회
   * @param {string} lectureCode
   * @returns {Promise<any>}
   */
  getLectureByLectureCode(lectureCode) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query(`SELECT * FROM lectures WHERE lectureCode LIKE '%${lectureCode}%'`, function (err, rows) {
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
   * model: lecture lectureName 조회
   * @param {string} lectureName
   * @returns {Promise<any>}
   */
  getLectureByLectureName(lectureName) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query(`SELECT * FROM lectures WHERE lectureName LIKE '%${lectureName}%'`, function (err, rows) {
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
   * model: lecture track 조회
   * @param {string} track
   * @returns {Promise<any>}
   */
  getLectureByTrack(track) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query(`SELECT * FROM lectures WHERE track LIKE '%${track}%'`, function (err, rows) {
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
   * model: lecture 업데이트
   * @param {number} lectureIndex
   * @param lectureData
   * @returns {Promise<any>}
   */
  updateLecture(lectureIndex, lectureData) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query('UPDATE lectures SET ? WHERE lectureIndex = ?', [lectureData,
            lectureIndex], function (err, rows) {
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
   * model: lecture 삭제
   * @param {number} lectureIndex
   * @returns {Promise<any>}
   */
  deleteLecture(lectureIndex) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      yield pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function* () {
          yield connection.query('DELETE FROM lectures WHERE lectureIndex = ?', lectureIndex, function (err, rows) {
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
}

exports.Lecture = Lecture;
exports.lecture = new Lecture();
//# sourceMappingURL=lecture.model.js.map