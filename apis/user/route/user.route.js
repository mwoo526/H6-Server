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
const s3_util_1 = require("../../../packages/utils/s3.util");
const user_resource_1 = require("../../../resources/user.resource");
const lectureReply_model_1 = require("../../lecture/model/lectureReply.model");
const userValidation_model_1 = require("../../userValidation/model/userValidation.model");
const user_model_1 = require("../model/user.model");
let avatar = s3_util_1.s3Util.upload.single('avatar');
class UserRoutes {
    constructor() {
        this.userRouter = express.Router();
        this.router();
    }
    router() {
        this.userRouter.post('/user', createUser);
        this.userRouter.post('/user/userId/:userId/uploadAvatar', uploadAvatar);
        this.userRouter.get('/user', pageListUser);
        this.userRouter.get('/user/userId/:userId', getUser);
        this.userRouter.get('/user/blockUserNickName/:blockUserNickName', getBlockUserNickName);
        this.userRouter.put('/user/userId/:userId', updateUser);
        this.userRouter.put('/user/userId/:userId/password', updateUserPassword);
        this.userRouter.delete('/user/userId/:userId', deleteUser);
    }
}
exports.UserRoutes = UserRoutes;
/**
 * route: user 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = new user_resource_1.UserResource(req.body);
        try {
            const result = yield user_model_1.user.createUser(userData);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
/**
 * route: user page 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function pageListUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let page = parseInt(req.query.page);
            let count = parseInt(req.query.count);
            const result = yield user_model_1.user.pageListUser(page, count);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
/**
 * route: user userId 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        try {
            const result = yield user_model_1.user.getUser(userId);
            res.send({
                success: true,
                statusCode: 200,
                result: result[0],
                message: 'getUser: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getUser: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: blockUserNickName 조회
 * @param req
 * @param res
 */
function getBlockUserNickName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userNickName = req.params.blockUserNickName;
        try {
            yield user_model_1.user.getBlockUserNickName(userNickName);
            res.send({
                success: true,
                statusCode: 200,
                message: 'getBlockUserNicName: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'The NickName is not allowed':
                    res.send({
                        success: false,
                        statusCode: 409,
                        message: 'getBlockUserNicName: 40901'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getBlockUserNicName: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: user 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        try {
            const result = yield user_model_1.user.updateUser(userId, req.body);
            res.send(result);
        }
        catch (err) {
            res.send(err);
        }
    });
}
/**
 * route: user 비밀번호 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function updateUserPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        let userPw = req.body.userPw;
        let userNewPw = req.body.userNewPw;
        try {
            yield user_model_1.user.getUserPassword(userId, userPw);
            yield user_model_1.user.updateUserPassword(userId, userNewPw);
            res.send({
                success: true,
                statusCode: 200,
                message: 'updateUserPassword: 200'
            });
        }
        catch (err) {
            switch (err) {
                case 'The password is incorrect':
                    res.send({
                        success: false,
                        statusCode: 404,
                        message: 'updateUserPassword: 40401'
                    });
                    break;
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'updateUserPassword: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: user 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        try {
            const resultUser = yield user_model_1.user.getUser(userId);
            yield userValidation_model_1.userValidation.deleteUserValidation(userId);
            yield lectureReply_model_1.lectureReply.deleteLectureReplyByUserIndex(resultUser[0].userIndex);
            yield user_model_1.user.deleteUser(userId);
            yield user_model_1.user.createUserLog({
                userId: req.params.userId,
                log: 'Withdrawal success'
            });
            res.send({
                success: true,
                statusCode: 200,
                message: 'deleteUser: 200'
            });
        }
        catch (err) {
            switch (err) {
                default:
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'deleteUser: 50000'
                    });
                    break;
            }
        }
    });
}
/**
 * route: user avatar 업로드
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
function uploadAvatar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        avatar(req, res, function (err) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    if (err.message === 'The AWS Access Key Id you provided does not exist in our records.') {
                        res.send({
                            success: false,
                            statusCode: 403,
                            message: 'uploadAvatar: 40301'
                        });
                    }
                    if (err.message === 'The request signature we calculated does not match the signature you provided. Check your key and signing method.') {
                        res.send({
                            success: false,
                            statusCode: 403,
                            message: 'uploadAvatar: 40302'
                        });
                    }
                }
                try {
                    let result = req.file;
                    /** 아바타 등록 */
                    yield user_model_1.user.updateUser(userId, {
                        avatar: result.location
                    });
                    res.send({
                        success: true,
                        statusCode: 200,
                        result: result.location,
                        message: 'uploadAvatar: 200'
                    });
                }
                catch (err) {
                    switch (err) {
                        default:
                            res.send({
                                success: false,
                                statusCode: 500,
                                message: 'uploadAvatar: 50000'
                            });
                            break;
                    }
                }
            });
        });
    });
}
exports.userRoutes = new UserRoutes();
//# sourceMappingURL=user.route.js.map