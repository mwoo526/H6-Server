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
const uuid_util_1 = require("../../../packages/utils/uuid.util");
const user_model_1 = require("../../user/model/user.model");
const userValidation_model_1 = require("../model/userValidation.model");
class UserValidationRoutes {
    constructor() {
        this.userValidationRouter = express.Router();
        this.router();
    }
    router() {
        // this.userValidationRouter.post('/userValidation/sendValidationCode/:userId', sendValidationCode);
        // this.userValidationRouter.post('/userValidation/checkValidationCode/:userId', checkValidationCode);
        this.userValidationRouter.get('/userValidation/checkUserId/:userId', checkUserId);
        this.userValidationRouter.get('/userValidation/checkUserNickName/:userNickName', checkUserNickName);
        this.userValidationRouter.post('/userValidation/sendValidationMail/', sendValidationMail);
        this.userValidationRouter.get('/userValidation/verify/:uuid', verifyValidation);
    }
}
exports.UserValidationRoutes = UserValidationRoutes;
/**
 * route: 인증코드 체크
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function checkValidationCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        const validationCode = req.body.validationCode;
        const userData = yield user_model_1.user.getUser(userId);
        try {
            const result = yield userValidation_model_1.userValidation.checkValidationCode(userId, userData, validationCode);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
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
            const resSetUuid = yield userValidation_model_1.userValidation.setUuid(userId, uuid);
            let html = userId + '님 안녕하세요.<br><br> H6 App 을 정상적으로 이용하기 위해서는 이메일 인증을 해주세요. <br><br>';
            html = html + '아래 링크를 누르시면 인증이 완료 됩니다.<br><br>';
            html = html + '<a href=' + link + '>' + link + '</a>';
            let mailOptions = {
                to: email,
                subject: 'H6 이메일 인증',
                html: html
            };
            const resultMail = yield userValidation_model_1.userValidation.sendValidationMail(mailOptions);
            res.send(resultMail);
        }
        catch (err) {
            res.send(err);
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
                if (isValidOnDate(uvYearUpdatedAt, uvMonthUpdatedAt, uvDayUpdatedAt)) {
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
                res.end('Requset is from unkown source');
            }
        }
        catch (err) {
            res.send(err);
        }
    });
}
/**
 * route: 인증기간 검증
 * @returns boolean
 */
function isValidOnDate(year, month, day) {
    let date = new Date();
    let curYear = date.getFullYear();
    let curMonth = date.getMonth() + 1;
    let curDay = date.getDate();
    let diffYear = curYear - year;
    let diffMonth = curMonth - month;
    let diffDay = curDay - day;
    if (diffYear == 1 && curMonth == 1 && curDay == 1) {
        return true;
    }
    if (diffYear == 0) {
        if (diffMonth == 1 && curDay == 1) {
            return true;
        }
        if (diffMonth == 0 && diffDay <= 1) {
            return true;
        }
    }
    return false;
}
exports.userValidationRoutes = new UserValidationRoutes();
//# sourceMappingURL=userValidation.route.js.map