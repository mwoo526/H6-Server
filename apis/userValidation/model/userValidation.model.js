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
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class UserValidation {
    constructor() {
    }
    /**
     * model: 인증코드 생성
     * @param {string} userId
     * @param {string} userEmail
     * @param validationCode
     * @returns {Promise<any>}

    createValidationCode(userId: string, userEmail: string, validationCode: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await emailUtil.sendEmail('kingdom0608@gmail.com', `${userEmail}@naver.com`, 'test', validationCode);
            await pool.getConnection(async function(err, connection) {
                await connection.query(`UPDATE usersValidation SET validationCode = '${validationCode}' WHERE userId = '${userId}'`, async function(err) {
                    if (err) {
                        await connection.release();
                        reject(err);
                    } else {
                        await connection.release();
                        resolve(validationCode);
                    }
                })
            })
        })
    }
     */
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
     * model: 인증여부 업데이트
     * @param {string} userId
     * @returns {Promise<any>}

    updateIsValidation(userId: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await pool.getConnection(async function(err, connection) {
                await connection.query(`UPDATE usersValidation SET isValidation = true WHERE userId = '${userId}'`, function(err) {
                    if (err) {
                        console.log(err);
                        connection.release();
                        reject(err);
                    } else {
                        connection.release();
                        resolve(userId);
                    }
                })
            })
        })
    }
     */
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
     * model: 인증메일 발송
     * @param
     * @returns {Promise<any>}
     */
    sendValidationMail(mailOptions) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield email_util_1.emailUtil.sendEmail(mailOptions, resolve, reject);
        }));
    }
    /**
     * model: DB에 저장된 uuid 가져오기
     * @param
     * @returns {Promise<any>}
     */
    getUUIDdata(userId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
                yield connection.query(`SELECT validationCode FROM usersValidation where userId=?`, [userId], (err, rows) => {
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
    getUserIDdata(uuid) {
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
     * model: DB usersValidation table에 uuid 저장하기
     * @param
     * @returns {Promise<any>}
     */
    setUUID(userId, uuid) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
                yield connection.query(`UPDATE usersValidation set validationCode='${uuid}' WHERE userId = ?`, [userId], (err, rows) => {
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
     * @param
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
     * @param {string} userId
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
}
exports.UserValidation = UserValidation;
exports.userValidation = new UserValidation();
//# sourceMappingURL=userValidation.model.js.map