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
const conn = mysql_util_1.mysqlResource.conn;
class SignUp {
    constructor() {
    }
    /**
     * model: 회원가입
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
}
exports.SignUp = SignUp;
exports.signUp = new SignUp();
//# sourceMappingURL=signUp.model.js.map