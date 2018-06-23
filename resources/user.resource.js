"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encryption_utli_1 = require("../packages/utils/encryption.utli");
class UserResource {
    constructor(signUpData) {
        this.setUserId(signUpData.userId);
        this.setUserPw(signUpData.userPw);
        this.setUserNickName(signUpData.userNickName);
        this.setMajor(signUpData.major);
        this.setMinor(signUpData.minor);
        this.setDoubleMajor(signUpData.doubleMajor);
        this.setConnectedMajor(signUpData.connectedMajor);
        this.setAdmissionYear(signUpData.admissionYear);
    }
    getUserId() {
        return this.userId;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    getUserPw() {
        return this.userPw;
    }
    setUserPw(userPw) {
        this.userPw = encryption_utli_1.encriptionPw.getHash(userPw);
    }
    getUserNickName() {
        return this.userNickName;
    }
    setUserNickName(userNickName) {
        this.userNickName = userNickName;
    }
    getMajor() {
        return this.major;
    }
    setMajor(major) {
        this.major = major;
    }
    getMinor() {
        return this.minor;
    }
    setMinor(minor) {
        this.minor = minor;
    }
    getDoubleMajor() {
        return this.doubleMajor;
    }
    setDoubleMajor(doubleMajor) {
        this.doubleMajor = doubleMajor;
    }
    getConnectedMajor() {
        return this.connectedMajor;
    }
    setConnectedMajor(connectedMajor) {
        this.connectedMajor = connectedMajor;
    }
    getAdmissionYear() {
        return this.admissionYear;
    }
    setAdmissionYear(admissionYear) {
        this.admissionYear = admissionYear;
    }
    getSignUp() {
        let userResource = {
            userId: this.getUserId(),
            userPw: this.getUserPw(),
            userNickName: this.getUserNickName(),
            major: this.getMajor(),
            minor: this.getMinor(),
            doubleMajor: this.getDoubleMajor(),
            connectedMajor: this.getConnectedMajor(),
            admissionYear: this.getAdmissionYear(),
            isValidation: false
        };
        return userResource;
    }
}
exports.UserResource = UserResource;
//# sourceMappingURL=user.resource.js.map