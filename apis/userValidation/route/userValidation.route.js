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
const inviteCode_util_1 = require("../../../packages/utils/inviteCode.util");
const user_model_1 = require("../../user/model/user.model");
const userValidation_model_1 = require("../model/userValidation.model");
class UserValidationRoutes {
    constructor() {
        this.userValidationRouter = express.Router();
        this.router();
    }
    router() {
        this.userValidationRouter.post('/userValidation/sendValidationCode/:userId', sendValidationCode);
        this.userValidationRouter.post('/userValidation/checkValidationCode/:userId', checkValidationCode);
        this.userValidationRouter.get('/userValidation/checkUserId/:userId', checkUserId);
        this.userValidationRouter.get('/userValidation/checkUserNickName/:userNickName', checkUserNickName);
        this.userValidationRouter.get('/userValidation/checkEmail/:userEmail', checkEmail);
    }
}
exports.UserValidationRoutes = UserValidationRoutes;
/**
 * route: 인증코드 전송
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function sendValidationCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.userId;
            const userData = yield user_model_1.user.getUser(userId);
            const userEmail = userData[0].userEmail;
            const validationCode = yield String(inviteCode_util_1.getRandomInt());
            const result = yield userValidation_model_1.userValidation.createValidationCode(userId, userEmail, validationCode);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
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
 * route: 이메일 중복 체크
 * @param req
 * @param res
 * @returns {Promise<any>}
 */
function checkEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userEmail = req.params.userEmail;
        try {
            yield userValidation_model_1.userValidation.checkUserEmail(userEmail);
            res.send({
                success: true,
                statusCode: 200,
                message: 'checkEmail: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'Email already exists':
                    res.send({
                        success: false,
                        statusCode: 409,
                        message: 'checkEmail: 40901'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'checkEmail: 50000'
                    });
                    break;
            }
        }
    });
}
exports.userValidationRoutes = new UserValidationRoutes();
//# sourceMappingURL=userValidation.route.js.map