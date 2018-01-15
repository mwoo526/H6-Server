"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pbkdf2 = require("pbkdf2");
//salt값
let salt = 'h6pwdhash';
//암호화 반복횟수
let iterations = 5;
//결과 byte길이
let keylen = 16;
//사용할 암호화
let digest = 'sha512';
class Pwdhash {
    getHash(pwd) {
        let derivedKey = pbkdf2.pbkdf2Sync(pwd, salt, iterations, keylen, digest);
        return derivedKey.toString('hex');
    }
}
exports.pwdhash = new Pwdhash();
//# sourceMappingURL=pwdhash.js.map