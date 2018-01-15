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
const mysql = require("mysql");
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'h6'
});
conn.connect();
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
            yield conn.query(`INSERT INTO users SET ?`, [userData], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(userData);
                }
            });
        }));
    }
    /**
     * model: user 리스트 조회
     * @returns {Promise<any>}
     */
    listUser() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield conn.query(`SELECT * FROM users`, function (err, rows) {
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
     * model: user studentId 조회
     * @param {number} studentId
     * @returns {Promise<any>}
     */
    getUser(studentId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield conn.query(`SELECT * FROM users WHERE studentId=?`, [studentId], function (err, rows) {
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
     * model: user 업데이트
     * @param {number} studentId
     * @param userData
     * @returns {Promise<any>}
     */
    updateUser(studentId, userData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield conn.query(`UPDATE users SET name='${userData.name}' WHERE studentId=${studentId}`, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(userData);
                }
            });
        }));
    }
    /**
     * model: user 삭제
     * @param {number} studentId
     * @returns {Promise<any>}
     */
    deleteUser(studentId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield conn.query(`DELETE FROM users WHERE studentId=${studentId}`, function (err, rows) {
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
exports.User = User;
exports.user = new User();
//# sourceMappingURL=user.model.js.map