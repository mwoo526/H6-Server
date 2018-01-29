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
const mysql_resource_1 = require("../../../resource/mysql.resource");
const conn = mysql_resource_1.mysqlResource.conn;
class Lecture {
    /**
     * model: lecture 생성
     * @param lectureData
     * @returns {Promise<any>}
     */
    createLecture(lectureData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield conn.query('INSERT INTO lectures SET ?', lectureData, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(lectureData);
                }
            });
        }));
    }
    /**
     * model: lecture 리스트 조회
     * @returns {Promise<any>}
     */
    listLecture() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield conn.query('SELECT * FROM lectures', function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
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
            yield conn.query('SELECT * FROM lectures WHERE lectureIndex = ?', lectureIndex, function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        }));
    }
    /**
     * model: lecture code 조회
     * @param {string} lectureCode
     * @returns {Promise<any>}
     */
    getLectureByLectureCode(lectureCode) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield conn.query(`SELECT * FROM lectures WHERE lectureCode LIKE  '%${lectureCode}%'`, function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        }));
    }
    /**
     * model: lecture professsorName 조회
     * @param {string} professorName
     * @returns {Promise<any>}
     */
    getLectureByProfessorName(professorName) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield conn.query(`SELECT * FROM lectures JOIN professors USING(professorIndex) WHERE professorName LIKE '%${professorName}%'`, function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
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
            yield conn.query(`SELECT * FROM lectures WHERE lectureName LIKE '%${lectureName}%'`, function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
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
            yield conn.query(`SELECT * FROM lectures WHERE track LIKE '%${track}%'`, function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
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
            yield conn.query('UPDATE lectures SET ? WHERE lectureIndex = ?', [lectureData, lectureIndex], function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
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
            yield conn.query('DELETE FROM lectures WHERE lectureIndex = ?', lectureIndex, function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        }));
    }
}
exports.Lecture = Lecture;
exports.lecture = new Lecture();
//# sourceMappingURL=lecture.model.js.map