"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pwdhash_1 = require("../../encription/pwdhash");
class RegisterVo {
    constructor(registerData) {
        this.userId = registerData.userId;
        this.userPw = pwdhash_1.pwdhash.getHash(registerData.userPw);
        this.userNickName = registerData.userNickName;
        this.major = registerData.major;
        this.minor = registerData.minor;
        this.doubleMajor = registerData.doubleMajor;
        this.connectedMajor = registerData.connectedMajor;
        this.admissionYear = registerData.admissionYear;
    }
    createRegister() {
        let obj = {
            userId: this.userId,
            userPw: this.userPw,
            userNickName: this.userNickName,
            major: this.major,
            minor: this.minor,
            doubleMajor: this.doubleMajor,
            connectedMajor: this.connectedMajor,
            admissionYear: this.admissionYear
        };
        return obj;
    }
}
exports.RegisterVo = RegisterVo;
//# sourceMappingURL=register.vo.js.map