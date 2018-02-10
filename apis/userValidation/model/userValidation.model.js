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
const conn = mysql_util_1.mysqlUtil.conn;
class UserValidation {
    constructor() {
    }
    createValidationCode(userId, email, validationCode) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield email_util_1.emailUtil.sendEmail('kingdom0608@gmail.com', `${email}@naver.com`, 'test', validationCode);
            yield conn.query(`UPDATE usersValidation SET validationCode = '${validationCode}' WHERE userId = '${userId}'`, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(validationCode);
                }
            });
        }));
    }
    getValidationCode(userId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield conn.query(`SELECT * FROM usersValidation WHERE userId=?`, [userId], function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        }));
    }
    updateIsValidation(userId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield conn.query(`UPDATE usersValidation SET isValidation = true WHERE userId = '${userId}'`, function (err) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(userId);
                }
            });
        }));
    }
    checkValidationCode(userId, userData, validationCode) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const getValidationCode = yield this.getValidationCode(userId);
            if (userData[0].email == null) {
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
}
exports.UserValidation = UserValidation;
exports.userValidation = new UserValidation();
//# sourceMappingURL=userValidation.model.js.map