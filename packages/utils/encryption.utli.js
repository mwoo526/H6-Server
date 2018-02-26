"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pbkdf2 = require("pbkdf2");
/** salt 값 */
let salt = 'H6-server';
/** 암호화 횟수 */
let iterations = 5;
/** 암호화 길이 */
let keyLength = 16;
/** 암호화 방식 */
let digest = 'sha512';
class EncryptionPw {
    getHash(pwd) {
        let derivedKey = pbkdf2.pbkdf2Sync(pwd, salt, iterations, keyLength, digest);
        return derivedKey.toString('hex');
    }
}
exports.encriptionPw = new EncryptionPw();
//# sourceMappingURL=encryption.utli.js.map