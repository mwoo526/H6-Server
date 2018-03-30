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
// TODO(@jade): textbook 칼럼 추가  date: 2018. 2. 21. 오후 6:11
class LectureInfo {
    /**
     * verify: lectureInfo 생성
     * @param lectureInfoData
     * @returns {Promise<void>}
     */
    createLectureInfo(lectureInfoData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`INSERT INTO lecturesInfo SET ?`, lectureInfoData, function (err) {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            connection.release();
                            resolve(lectureInfoData);
                        }
                    });
                });
            });
        }));
    }
    /**
     * verify: lectureInfo 리스트 조회
     * @returns {Promise<void>}
     */
    listLectureInfo() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName FROM lecturesInfo AS t1 INNER JOIN lectures AS t2 ON t1.lectureIndex = t2.lectureIndex INNER JOIN professors AS t3 ON t1.professorIndex = t3.professorIndex`, function (err, rows) {
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
     * verify: lectureInfo page 리스트 조회
     * @returns {Promise<any>}
     */
    pageListLectureInfo(page, count) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    let start = (page - 1) * count;
                    if (start < 0) {
                        start = 0;
                    }
                    yield connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName
                FROM lecturesInfo AS t1 
                INNER JOIN lectures AS t2 ON t1.lectureIndex = t2.lectureIndex 
                INNER JOIN professors AS t3 ON t1.professorIndex = t3.professorIndex 
                ORDER BY t1.lectureInfoIndex ASC LIMIT ${start}, ${count}`, function (err, rows) {
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
     * verify: lectureInfo index 조회
     * @param lectureInfoIndex
     * @returns {Promise<void>}
     */
    getLectureInfoByLectureInfoIndex(lectureInfoIndex) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
				FROM lecturesInfo AS t1 INNER JOIN lectures AS t2 ON t1.lectureIndex = t2.lectureIndex INNER JOIN professors AS t3 ON t1.professorIndex = t3.professorIndex WHERE t1.lectureInfoIndex = ${lectureInfoIndex}`, function (err, rows) {
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
     * verify: lectureInfo lectureName 조회
     * @param lectureName
     * @returns {Promise<void>}
     */
    getLectureInfoByLectureName(lectureName) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName FROM lecturesInfo AS t1 INNER JOIN lectures AS t2 ON t1.lectureIndex = t2.lectureIndex INNER JOIN professors AS t3 ON t1.professorIndex = t3.professorIndex WHERE t2.lectureName LIKE '%${lectureName}%'`, function (err, rows) {
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
     * verify: lectureInfo lectureName page 조회
     * @param lectureName
     * @returns {Promise<void>}
     */
    pageGetLectureInfoByLectureName(lectureName, page, count) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    let start = (page - 1) * count;
                    if (start < 0) {
                        start = 0;
                    }
                    yield connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
                FROM lecturesInfo AS t1 
                INNER JOIN lectures AS t2 ON t1.lectureIndex = t2.lectureIndex 
                INNER JOIN professors AS t3 ON t1.professorIndex = t3.professorIndex 
                WHERE t2.lectureName LIKE '%${lectureName}%'
                ORDER BY t1.lectureInfoIndex ASC LIMIT ${start}, ${count}`, function (err, rows) {
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
     * verify: lectureInfo professorName 조회
     * @param professorName
     * @returns {Promise<void>}
     */
    getLectureInfoByProfessorName(professorName) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName FROM lecturesInfo AS t1 INNER JOIN lectures AS t2 ON t1.lectureIndex = t2.lectureIndex INNER JOIN professors AS t3 ON t1.professorIndex = t3.professorIndex WHERE t3.professorName LIKE '%${professorName}%'`, function (err, rows) {
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
     * verify: lectureInfo professorName page 조회
     * @param professorName
     * @returns {Promise<void>}
     */
    pageGetLectureInfoByProfessorName(professorName, page, count) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    let start = (page - 1) * count;
                    if (start < 0) {
                        start = 0;
                    }
                    yield connection.query(`SELECT t1.lectureInfoIndex, t1.average, t2.lectureName, t2.track, t3.professorName 
                FROM lecturesInfo AS t1 
                INNER JOIN lectures AS t2 ON t1.lectureIndex = t2.lectureIndex 
                INNER JOIN professors AS t3 ON t1.professorIndex = t3.professorIndex 
                WHERE t3.professorName LIKE '%${professorName}%'
                ORDER BY t1.lectureInfoIndex ASC LIMIT ${start}, ${count}`, function (err, rows) {
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
     * verify: lectureInfo 업데이트
     * @param {number} lectureInfoIndex
     * @param lectureInfoData
     * @returns {Promise<void>}
     */
    updateLectureInfo(lectureInfoIndex, lectureInfoData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`UPDATE lecturesInfo SET ? WHERE lectureInfoIndex = ?`, [lectureInfoData,
                        lectureInfoIndex], function (err) {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            connection.release();
                            resolve(lectureInfoData);
                        }
                    });
                });
            });
        }));
    }
    /**
     * verify: lectureInfo 삭제
     * @param {number} lectureInfoIndex
     * @returns {Promise<void>}
     */
    deleteLectureInfo(lectureInfoIndex) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query('DELETE FROM lecturesInfo WHERE lectureInfoIndex = ?', lectureInfoIndex, function (err, rows) {
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
exports.LectureInfo = LectureInfo;
exports.lectureInfo = new LectureInfo();
//# sourceMappingURL=lectureInfo.model.js.map