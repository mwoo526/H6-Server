"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class LectureReply {
    /**
     * model: lectureReply 생성
     * @param lectureReplyData
     * @returns {Promise<void>}
     */
    createLectureReply(lectureReplyData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`INSERT INTO lecturesReply SET ?`, lectureReplyData, function (err) {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            connection.release();
                            resolve(lectureReplyData);
                        }
                    });
                });
            });
        }));
    }
    /**
     * model: lectureReply 리스트 조회
     * @returns {Promise<void>}
     */
    listLectureReply() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.score, t2.userId, t2.userNickName FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex`, function (err, rows) {
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
     * model: lectureReply index 조회
     * @param {number} lectureReplyIndex
     * @returns {Promise<void>}
     */
    getLectureReplyByLectureReplyIndex(lectureReplyIndex) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.score, t2.userId, t2.userNickName FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex WHERE t1.lectureReplyIndex = ${lectureReplyIndex}`, function (err, rows) {
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
     * model: lectureReply lectureInfoIndex 조회
     * @param {number} lectureInfoIndex
     * @returns {Promise<void>}
     */
    getLectureReplyByLectureInfoIndex(lectureInfoIndex) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.score, t2.userId, t2.userNickName FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex WHERE t1.lectureInfoIndex = ${lectureInfoIndex}`, function (err, rows) {
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
     * model: lectureReply userIndex 조회
     * @param {number} userIndex
     * @returns {Promise<void>}
     */
    getLectureReplyByUserIndex(userIndex) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.score, t2.userId, t2.userNickName FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex WHERE t2.userIndex = ${userIndex}`, function (err, rows) {
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
     * model: lectureReply userId 조회
     * @param {string} userId
     * @returns {Promise<void>}
     */
    getLectureReplyByUserId(userId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.score, t2.userId, t2.userNickName FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex WHERE t2.userId LIKE '%${userId}%'`, function (err, rows) {
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
     * model: lectureReply userNickName 조회
     * @param {string} userNickName
     * @returns {Promise<void>}
     */
    getLectureReplyByUserNickName(userNickName) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.score, t2.userId, t2.userNickName FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex WHERE t2.userNickName LIKE '%${userNickName}%'`, function (err, rows) {
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
     * model: lectureReply 업데이트
     * @param {number} lectureReplyIndex
     * @param lectureReplyData
     * @returns {Promise<void>}
     */
    updateLectureReply(lectureReplyIndex, lectureReplyData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`UPDATE lecturesReply SET ? WHERE lectureReplyIndex = ?`, [lectureReplyData,
                        lectureReplyIndex], function (err) {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            connection.release();
                            resolve(lectureReplyData);
                        }
                    });
                });
            });
        }));
    }
    /**
     * model: lectureReply 삭제
     * @param {number} lectureReplyIndex
     * @returns {Promise<void>}
     */
    deleteLectureReply(lectureReplyIndex) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query('DELETE FROM lecturesReply WHERE lectureReplyIndex = ?', lectureReplyIndex, function (err, rows) {
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
exports.LectureReply = LectureReply;
exports.lectureReply = new LectureReply();
//# sourceMappingURL=lectureReply.model.js.map