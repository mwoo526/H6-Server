"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pwdhash_1 = require("../../encription/pwdhash");
class RegisterVO {
    constructor(registerData) {
        this.setUserId(registerData.userId);
        this.setUserPw(registerData.userPw);
        this.setUserNickName(registerData.userNickName);
        this.setMajor(registerData.major);
        this.setMinor(registerData.minor);
        this.setDoubleMajor(registerData.doubleMajor);
        this.setConnectedMajor(registerData.connectedMajor);
        this.setAdmissionYear(registerData.admissionYear);
    }
    getUserIndex() {
        return this.userIndex;
    }
    setUserIndex(index) {
        this.userIndex = index;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(id) {
        this.userId = id;
    }
    getUserPw() {
        return this.userPw;
    }
    setUserPw(pw) {
        this.userPw = pwdhash_1.pwdhash.getHash(pw);
    }
    getUserNickName() {
        return this.userNickName;
    }
    setUserNickName(nickname) {
        this.userNickName = nickname;
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
    setDoubleMajor(doublemajor) {
        this.doubleMajor = doublemajor;
    }
    getConnectedMajor() {
        return this.connectedMajor;
    }
    setConnectedMajor(connectedmajor) {
        this.connectedMajor = connectedmajor;
    }
    getAdmissionYaer() {
        return this.admissionYear;
    }
    setAdmissionYear(adyear) {
        this.admissionYear = adyear;
    }
    getCreateAt() {
        return this.createdAt;
    }
    setCreateAt(createat) {
        this.createdAt = createat;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    setUpdatedAt(updateat) {
        this.updatedAt = updateat;
    }
    getRegister() {
        let obj = {
            userId: this.getUserId(),
            userPw: this.getUserPw(),
            userNickName: this.getUserNickName(),
            major: this.getMajor(),
            minor: this.getMinor(),
            doubleMajor: this.getDoubleMajor(),
            connectedMajor: this.getConnectedMajor(),
            admissionYear: this.getAdmissionYaer()
        };
        return obj;
    }
}
exports.RegisterVO = RegisterVO;
//# sourceMappingURL=register.vo.js.map