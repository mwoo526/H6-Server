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
const email_util_1 = require("../../../packages/utils/email.util");
const encryption_utli_1 = require("../../../packages/utils/encryption.utli");
const mysql_util_1 = require("../../../packages/utils/mysql.util");
var smtpTransport = email_util_1.emailUtil.smtpTransport;
const pool = mysql_util_1.mysqlUtil.pool;
class UserValidation {
    constructor() {
    }
    /**
     * model: userValidation 생성
     * @param userData
     * @returns {Promise<any>}
     */
    createUserValidation(userData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`INSERT INTO usersValidation SET ?`, [userData], function (err, rows) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (err) {
                                yield connection.release();
                                return reject(err);
                            }
                            else {
                                yield connection.release();
                                return resolve(rows);
                            }
                        });
                    });
                });
            });
        }));
    }
    /**
     * model: 인증코드 조회
     * @param {string} userId
     * @returns {Promise<any>}
     */
    getValidationCode(userId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`SELECT * FROM usersValidation WHERE userId=?`, [userId], function (err, rows) {
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
     * model: 인증코드 체크
     * @param {string} userId
     * @param userData
     * @param validationCode
     * @returns {Promise<any>}
     */
    checkValidationCode(userId, userData, validationCode) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const getValidationCode = yield this.getValidationCode(userId);
            if (userData[0].userEmail == null) {
                throw new Error('The email does not exist.');
            }
            else {
                const result = yield exports.userValidation.getValidationCode(userId);
                if (result[0].validationCode == validationCode) {
                    const result = yield exports.userValidation.updateIsValidation(userId);
                    resolve(result);
                }
                else if (getValidationCode[0].isValidation == true) {
                    reject('This validation Code is already verified');
                }
                else {
                    reject('The validation Code does not correct');
                }
            }
        }));
    }
    /**
     * model: 아이디 중복 검사
     * @param {string} userId
     * @returns {Promise<any>}
     */
    checkUserId(userId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`SELECT * FROM users WHERE userId = '${userId}'`, function (err, rows) {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            if (rows[0] != null) {
                                connection.release();
                                return reject('Id already exists');
                            }
                            else {
                                connection.release();
                                return resolve(rows);
                            }
                        }
                    });
                });
            });
        }));
    }
    /**
     * model: 닉네임 중복검사
     * @param {string} userNickName
     * @returns {Promise<any>}
     */
    checkUserNickName(userNickName) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`SELECT * FROM users WHERE userNickName = '${userNickName}'`, function (err, rows) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (err) {
                                connection.release();
                                reject(err);
                            }
                            else {
                                if (rows[0] != null) {
                                    yield connection.release();
                                    return reject('NickName already exists');
                                }
                                else {
                                    yield connection.release();
                                    return resolve(rows);
                                }
                            }
                        });
                    });
                });
            });
        }));
    }
    /**
     * model: 비밀번호 중복검사
     * @param {string} userPw
     * @returns {Promise<any>}
     */
    checkUserPw(userPw) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    userPw = yield encryption_utli_1.encriptionPw.getHash(userPw);
                    yield connection.query(`SELECT * FROM users WHERE userPw = '${userPw}'`, function (err, rows) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (err) {
                                connection.release();
                                reject(err);
                            }
                            else {
                                yield connection.release();
                                return resolve(rows);
                            }
                        });
                    });
                });
            });
        }));
    }
    /**
     * model: DB usersValidation 테이블에 uuid 저장하기
     * @param userId
     * @param uuid
     * @returns {Promise<any>}
     */
    setUuid(userId, uuid) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
                yield connection.query(`UPDATE usersValidation set validationCode='${uuid}' WHERE userId = ?`, [userId], (err, rows) => {
                    connection.release();
                    if (err) {
                        reject('setUuid query error');
                    }
                    else {
                        resolve(rows);
                    }
                });
            }));
        }));
    }
    /**
     * model: 새로운 비밀번호 발송
     * @param mailOptions
     * @returns {Promise<any>}
     */
    sendPasswordMail(mailOptions) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield smtpTransport.sendMail(mailOptions, (err, res) => {
                if (err) {
                    reject('sendPasswordMail error');
                }
                else {
                    resolve('send ok');
                }
            });
        }));
    }
    /**
     * model: 인증메일 발송
     * @param mailOptions
     * @returns {Promise<any>}
     */
    sendValidationMail(mailOptions) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield smtpTransport.sendMail(mailOptions, (err, res) => {
                if (err) {
                    reject('sendValidationMail error');
                }
                else {
                    resolve('send ok');
                }
            });
        }));
    }
    /**
     * model: uuid 를 통해 DB에 저장된 userId 가져오기
     * @param uuid
     * @returns {Promise<any>}
     */
    getUserIdData(uuid) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
                yield connection.query(`SELECT userId FROM usersValidation where validationCode=?`, [uuid], (err, rows) => {
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
     * model: 최근에 업데이트된 날짜 가져오기
     * @param userId
     * @returns {Promise<any>}
     */
    getUpdatedAt(userId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
                yield connection.query(`SELECT updatedAt FROM usersValidation where userId=?`, [userId], (err, rows) => {
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
     * model: 인증여부 업데이트
     * @param userId
     * @returns {Promise<any>}
     */
    updateIsValidation(userId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
                yield connection.query(`UPDATE usersValidation set isValidation='${1}' WHERE userId=?`, [userId], (err, rows) => {
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
     * model: userValidation 삭제
     * @param {string} userId
     * @returns {Promise<any>}
     */
    deleteUsersValidation(userId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
                yield connection.query(`DELETE FROM usersValidation WHERE userId=?`, [userId], (err, rows) => {
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
}
exports.UserValidation = UserValidation;
exports.userValidation = new UserValidation();
//# sourceMappingURL=userValidation.model.js.map