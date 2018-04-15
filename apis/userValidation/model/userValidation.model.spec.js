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
const chai_1 = require("chai");
const user_model_1 = require("../../user/model/user.model");
const userValidation_model_1 = require("./userValidation.model");
describe('userValidation 모델', () => {
    let resultCreateUser;
    let testUserId = '이미 존재하는 아이디';
    let testUserId2 = '사용 가능한 아이디';
    let testUserPw = 'marine1164k';
    let testUserNickName = 'Jade';
    let testEmail = '이미 존재하는 이메일';
    let testEmail2 = '사용 가능한 이메일';
    let testMajor = '산업경영공학과';
    let testAdmissionYear = 2012;
    before(() => __awaiter(this, void 0, void 0, function* () {
        try {
            resultCreateUser = yield user_model_1.user.createUser({
                userId: testUserId,
                userPw: testUserPw,
                userNickName: testUserNickName,
                email: testEmail,
                major: testMajor,
                admissionYear: testAdmissionYear
            });
            /** validation 체크 */
            chai_1.expect(resultCreateUser).instanceof(Object);
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    after(() => __awaiter(this, void 0, void 0, function* () {
        try {
            yield user_model_1.user.deleteUser(resultCreateUser.userId);
        }
        catch (err) {
            console.error('err', err);
        }
    }));
    it('checkUserId - 이미 존재하는 아이디', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield userValidation_model_1.userValidation.checkUserId(resultCreateUser.userId);
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    it('checkUserId - 사용 가능한 아이디', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield userValidation_model_1.userValidation.checkUserId(testUserId2);
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    it('checkEmail - 이미 존재하는 이메일', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield userValidation_model_1.userValidation.checkEmail(resultCreateUser.email);
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
    it('checkEmail - 사용 가능한 이메일', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield userValidation_model_1.userValidation.checkEmail(testEmail2);
        // console.log(result);
        chai_1.expect(result).instanceof(Object);
    }));
});
//# sourceMappingURL=userValidation.model.spec.js.map