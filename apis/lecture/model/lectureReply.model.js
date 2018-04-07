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
     * verify: lectureReply 생성
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
    countLecturesReply(lectureInfoIndex) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`SELECT COUNT(*) AS replyCount FROM lecturesReply WHERE lecturesReply.lectureInfoIndex = ${lectureInfoIndex}`, function (err, rows) {
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
     * verify: lectureReply 리스트 조회
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
     * verify: lectureReply 페이지 리스트 조회
     * @param {number} page
     * @param {number} count
     * @returns {Promise<any>}
     */
    pageListLectureReply(page, count) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    let start = (page - 1) * count;
                    if (start < 0) {
                        start = 0;
                    }
                    yield connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, function (err, rows) {
                        return __awaiter(this, void 0, void 0, function* () {
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
            });
        }));
    }
    /**
     * verify: lectureReply index 조회
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
     * verify: lectureReply replyIndex 페이지 조회
     * @param {number} lectureReplyIndex
     * @param {number} page
     * @param {number} count
     * @returns {Promise<any>}
     */
    pageGetLectureReplyByLectureReplyIndex(lectureReplyIndex, page, count) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    let start = (page - 1) * count;
                    if (start < 0) {
                        start = 0;
                    }
                    yield connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex
				WHERE t1.lectureReplyIndex LIKE '%${lectureReplyIndex}%'
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, function (err, rows) {
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
     * verify: lectureReply lectureInfoIndex 조회
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
     * verify: lectureReply lectureInfoIndex 페이지 조회
     * @param {number} lectureInfoIndex
     * @param {number} page
     * @param {number} count
     * @returns {Promise<any>}
     */
    pageGetLectureReplyByLectureInfoIndex(lectureInfoIndex, page, count) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    let start = (page - 1) * count;
                    if (start < 0) {
                        start = 0;
                    }
                    yield connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex
				WHERE t1.lectureInfoIndex LIKE '%${lectureInfoIndex}%'
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, function (err, rows) {
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
     * verify: lectureReply userIndex 조회
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
     * verify: lectureReply userIndex 페이지 조회
     * @param {number} userIndex
     * @param {number} page
     * @param {number} count
     * @returns {Promise<any>}
     */
    pageGetLectureReplyByUserIndex(userIndex, page, count) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    let start = (page - 1) * count;
                    if (start < 0) {
                        start = 0;
                    }
                    yield connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex
				WHERE t1.userIndex LIKE '%${userIndex}%'
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, function (err, rows) {
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
     * verify: lectureReply userId 조회
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
     * verify: lectureReply userId 페이지 조회
     * @param {number} userId
     * @param {number} page
     * @param {number} count
     * @returns {Promise<any>}
     */
    pageGetLectureReplyByUserId(userId, page, count) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    let start = (page - 1) * count;
                    if (start < 0) {
                        start = 0;
                    }
                    yield connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex
				WHERE t2.userId LIKE '%${userId}%'
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, function (err, rows) {
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
     * verify: lectureReply userNickName 조회
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
     * verify: lectureReply userNickName 페이지 조회
     * @param {number} userNickName
     * @param {number} page
     * @param {number} count
     * @returns {Promise<any>}
     */
    pageGetLectureReplyByUserNickName(userNickName, page, count) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    let start = (page - 1) * count;
                    if (start < 0) {
                        start = 0;
                    }
                    yield connection.query(`SELECT t1.lectureReplyIndex, t1.lectureInfoIndex, t1.userIndex, t1.semester, t1.homework, t1.homeworkType, t1.testCount, t1.receivedGrade, t1.score, t2.userId, t2.userNickName 
				FROM lecturesReply AS t1 INNER JOIN users AS t2 ON t1.userIndex = t2.userIndex
				WHERE t2.userNickName LIKE '%${userNickName}%'
				ORDER BY t1.lectureReplyIndex ASC LIMIT ${start}, ${count}`, function (err, rows) {
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
     * verify: lectureReply 업데이트
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
     * verify: lectureReply 삭제
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