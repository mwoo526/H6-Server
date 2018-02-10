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
const encryption_utli_1 = require("../../../packages/utils/encryption.utli");
const mysql_util_1 = require("../../../packages/utils/mysql.util");
const pool = mysql_util_1.mysqlUtil.pool;
class SignIn {
    /**
     * model: 로그인
     * @param userData
     * @returns {Promise<any>}
     */
    getUser(userData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield pool.getConnection(function (err, connection) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield connection.query(`SELECT * from users WHERE userId = ?`, [userData.userId], function (err, rows) {
                        if (err) {
                            connection.release();
                            reject(err);
                        }
                        else {
                            let err = {
                                message: 'The ID does not exist'
                            };
                            if (rows.length === 0) {
                                connection.release();
                                reject(err);
                            }
                            else {
                                if (rows[0].userPw === encryption_utli_1.encriptionPw.getHash(userData.userPw)) {
                                    connection.release();
                                    resolve(rows);
                                }
                                else {
                                    err.message = 'The password is incorrect';
                                    connection.release();
                                    reject(err);
                                }
                            }
                        }
                    });
                });
            });
        }));
    }
}
exports.signIn = new SignIn();
//# sourceMappingURL=signIn.model.js.map