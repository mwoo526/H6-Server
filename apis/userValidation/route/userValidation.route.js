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
const express = require("express");
const randomInt_util_1 = require("../../../packages/utils/randomInt.util");
const uuid_util_1 = require("../../../packages/utils/uuid.util");
const user_model_1 = require("../../user/model/user.model");
const userValidation_model_1 = require("../model/userValidation.model");
class UserValidationRoutes {
    constructor() {
        this.userValidationRouter = express.Router();
        this.router();
    }
    router() {
        this.userValidationRouter.get('/userValidation/checkUserId/:userId', checkUserId);
        this.userValidationRouter.get('/userValidation/checkUserNickName/:userNickName', checkUserNickName);
        this.userValidationRouter.get('/userValidation/checkUserPw', checkUserPw);
        this.userValidationRouter.get('/userValidation/sendPasswordMail/:userId', sendPasswordMail);
        this.userValidationRouter.post('/userValidation/sendValidationMail', sendValidationMail);
        this.userValidationRouter.get('/userValidation/verify/:uuid', verifyValidation);
    }
}
exports.UserValidationRoutes = UserValidationRoutes;
/**
 * route: 아이디 중복 체크
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function checkUserId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            yield userValidation_model_1.userValidation.checkUserId(userId);
            res.send({
                success: true,
                statusCode: 200,
                message: 'checkUserId: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'Id already exists':
                    res.send({
                        success: false,
                        statusCode: 409,
                        message: 'checkUserId: 40901'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'checkUserId: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: 닉네임 중복 체크
 * @param req
 * @param res
 * @returns {Promise<any>}
 */
function checkUserNickName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userNickName = req.params.userNickName;
        try {
            yield userValidation_model_1.userValidation.checkUserNickName(userNickName);
            res.send({
                success: true,
                statusCode: 200,
                message: 'checkUserNickName: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'NickName already exists':
                    res.send({
                        success: false,
                        statusCode: 409,
                        message: 'checkUserNickName: 40901'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'checkUserNickName: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: 비밀번호 중복 체크
 * @param req
 * @param res
 * @returns {Promise<any>}
 */
function checkUserPw(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userPw = req.body.userPw;
        try {
            yield userValidation_model_1.userValidation.checkUserPw(userPw);
            res.send({
                success: true,
                statusCode: 200,
                message: 'checkUserPw: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'checkUserPw: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: 새로운 비밀번호 이메일 전송
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function sendPasswordMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let newPassword = yield String(randomInt_util_1.getRandomInt());
            let userId = req.params.userId;
            let html = `${userId} 님 안녕하세요.<br><br> 임시비밀번호 ${newPassword} <br><br>`;
            yield user_model_1.user.updateUserPassword(userId, newPassword);
            let mailOptions = {
                to: userId,
                subject: '한담 비밀번호 재발급 매일',
                html: html
            };
            yield userValidation_model_1.userValidation.sendPasswordMail(mailOptions);
            res.send({
                success: true,
                statusCode: 200,
                message: 'sendPasswordMail'
            });
        }
        catch (err) {
            switch (err) {
                case 'sendPasswordMail error':
                    res.send({
                        success: false,
                        statusCode: 40001,
                        message: 'sendPasswordMail: 40001'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'sendPasswordMail: 50000'
                    });
            }
        }
    });
}
/**
 * route: 인증코드 전송
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function sendValidationMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let host = req.get('host');
            let uuid = uuid_util_1.uuidV1();
            let userId = req.body.userId;
            let link = 'http://' + host + '/userValidation/verify/' + uuid;
            let email = req.body.email;
            yield userValidation_model_1.userValidation.setUuid(userId, uuid);
            let html = userId + '님 안녕하세요.<br><br> 한담을 정상적으로 이용하기 위해서는 이메일 인증을 해주세요. <br><br>';
            html = html + '아래 링크를 누르시면 인증이 완료 됩니다.<br><br>';
            html = html + '<a href=' + link + '>' + link + '</a>';
            let mailOptions = {
                to: email,
                subject: '한담 한성인 인증 메일',
                html: html
            };
            yield userValidation_model_1.userValidation.sendValidationMail(mailOptions);
            res.send({
                success: true,
                statusCode: 200,
                message: 'sendValidationMail: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'setUuid query error':
                    res.send({
                        success: false,
                        statusCode: 400,
                        message: 'setUuid: 40001'
                    });
                    break;
                case 'sendValidationMail error':
                    res.send({
                        success: false,
                        statusCode: 400,
                        message: 'sendValidationMail: 40002'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'sendValidationMail: 50000'
                    });
            }
        }
    });
}
/**
 * route: 인증코드 검증
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function verifyValidation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.protocol == 'http') {
                let verifiedUuid = req.params.uuid;
                let uvUserId = yield userValidation_model_1.userValidation.getUserIdData(verifiedUuid);
                uvUserId = JSON.stringify(uvUserId);
                /** 해당 데이터가 없으면 [] */
                if (uvUserId == '[]') {
                    res.end('Unvalidated code Error!!');
                }
                let userId = uvUserId.split('"')[3];
                let uvUpdatedAt = yield userValidation_model_1.userValidation.getUpdatedAt(userId);
                uvUpdatedAt = JSON.stringify(uvUpdatedAt);
                uvUpdatedAt = uvUpdatedAt.split('"')[3];
                let uvDate = uvUpdatedAt.split('T')[0].split('-');
                let uvYearUpdatedAt = parseInt(uvDate[0]);
                let uvMonthUpdatedAt = parseInt(uvDate[1]);
                let uvDayUpdatedAt = parseInt(uvDate[2]);
                if (user_model_1.user.isValidOnDate(uvYearUpdatedAt, uvMonthUpdatedAt, uvDayUpdatedAt)) {
                    yield userValidation_model_1.userValidation.updateIsValidation(userId);
                    yield userValidation_model_1.userValidation.deleteUsersValidationRecord(userId);
                    yield user_model_1.user.updateIsValidation(userId);
                    res.end('Email is been Successfully verified');
                }
                else {
                    res.end('validation date expired.');
                }
            }
            else {
                res.end('Request is from unknown source');
            }
        }
        catch (err) {
            res.send(err);
        }
    });
}
exports.userValidationRoutes = new UserValidationRoutes();
//# sourceMappingURL=userValidation.route.js.map